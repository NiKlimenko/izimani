import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Modal} from 'clarity-angular';
import {Observable} from 'rxjs/Observable';
import {finalize, map, tap} from 'rxjs/operators';
import {Card, PaymentSystemType} from '../../../shared/card';
import {AutoPaymentPeriodType, AutoPaymentType, PaymentPayload} from '../../../shared/payment';
import {ContractType, PaymentProvider} from '../../../shared/payment-provider';
import {AppAlertService} from '../../../shared/services/app-alert.service';
import {CardService} from '../../../shared/services/card.service';
import {PaymentsService} from '../../../shared/services/payments.service';
import {TransferPayload} from '../../../shared/transfer-payload';
import {AppAlertParams} from '../../app-alert/app-alert.component';
import {TransactionsComponent} from '../../shared/transactions/transactions.component';

/**
 * Component for rendering credit cards
 */

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @ViewChild('blockCardModal')
  public blockCardModal: Modal;

  @ViewChild('unBlockCardModal')
  public unBlockCardModal: Modal;

  @ViewChild('transferModal')
  public transferModal: Modal;

  @ViewChild('reportModal')
  public reportModal: Modal;

  @ViewChild('paymentModal')
  public paymentModal: Modal;

  @ViewChild('transactions')
  public transactionsComponent: TransactionsComponent;

  public userCards: Observable<Card[]>;
  public selectedCard: Card;
  public cardNumberMask: (string|RegExp)[];

  public isBlockInAction: boolean = false;
  public isTransferInAction: boolean = false;

  public transferForm: FormGroup;
  public transferErrorMessage: string;
  public isTransferError: boolean = false;

  public paymentForm: FormGroup;
  public paymentProviders: Observable<PaymentProvider[]>;
  public autoPaymentType: AutoPaymentType[] = ['single', 'cyclic'];
  public autoPaymentPeriodType: AutoPaymentPeriodType[] = ['minutely', 'daily', 'monthly', 'yearly'];

  private cardService: CardService;
  private appAlertService: AppAlertService;
  private paymentsService: PaymentsService;
  private contractTypes: {[key: string]: ContractType};

  /**
   * @param {CardService} cardService
   * @param {AppAlertService} appAlertService
   * @param {PaymentsService} paymentsService
   */
  constructor(cardService: CardService, appAlertService: AppAlertService, paymentsService: PaymentsService) {
    this.cardService = cardService;
    this.appAlertService = appAlertService;
    this.paymentsService = paymentsService;

    this.cardNumberMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    this.transferForm = new FormGroup({
      cardNumber: new FormControl(),
      cvv: new FormControl(),
      amount: new FormControl()
    });

    this.paymentForm = new FormGroup({
      serviceId: new FormControl(),
      contractValue: new FormControl(),
      amount: new FormControl(),
      isAuto: new FormControl(),
      autoType: new FormControl(this.autoPaymentType[0]),
      autoPeriod: new FormControl(this.autoPaymentPeriodType[0]),
      autoStartDatetime: new FormControl()
    });

    this.contractTypes = {
      'phone number': 'phone_number',
      'contract number': 'contract_number',
      'order number': 'order_number'
    };
  }

  public ngOnInit() {
    this.requestUserCards();
  }

  /**
   * Formats card numbers (removes dashes)
   * @param {string} rawCardNumber
   * @returns {string}
   */
  public formatCardNumber(rawCardNumber: string): string {
    return rawCardNumber.replace(/-/g, ' ');
  }

  /**
   * Returns the set of CSS classes depending on the payment system card
   * @param {PaymentSystemType} cardType
   * @returns {Object}
   */
  public getCardPaymentSystemClass(cardType: PaymentSystemType): object {
    return {
      ccs: true,
      'ccs-visa': cardType === 'visa',
      'ccs-mastercard': cardType === 'master_card'
    };
  }

  /**
   * Sets the current used card for further actions
   * @param {Card} card
   */
  public cardSelected(card: Card) {
    this.selectedCard = card;
  }

  /**
   * Blocks card
   */
  public blockSelectedCard() {
    this.isBlockInAction = true;
    this.cardService.lockCard(this.selectedCard.iban).subscribe(() => {
      this.selectedCard.isLocked = true;
      this.isBlockInAction = false;
      this.blockCardModal.close();
    });
  }

  /**
   * Unlocks card
   */
  public unBlockSelectedCard() {
    this.isBlockInAction = true;
    this.cardService.unLockCard(this.selectedCard.iban).subscribe(() => {
      this.selectedCard.isLocked = false;
      this.isBlockInAction = false;
      this.unBlockCardModal.close();
    });
  }

  /**
   * Performs a transaction to another card
   */
  public transferToCard() {
    const cardNumber: string = this.transferForm.value.cardNumber;
    const cvv: string = this.transferForm.value.cvv;
    const amount: number = this.transferForm.value.amount;
    this.isTransferInAction = true;

    const payload: TransferPayload = new TransferPayload(cardNumber, cvv, amount);

    this.cardService.transferToCard(this.selectedCard.iban, payload).pipe(
      finalize(() => this.isTransferInAction = false)
    )
      .subscribe(() => {
        this.transferModal.close();
        this.appAlertService.showAlert(new AppAlertParams('Transaction was successful', 3000, 'success'));
        this.requestUserCards();
      }, (error: string) => {
        this.transferErrorMessage = error;
        this.isTransferError = true;
      });
  }

  /**
   * Close handler of a transfer modal
   * @param {boolean} isModalOpen
   */
  public transferModalClosed(isModalOpen: boolean) {
    if (!isModalOpen) {
      this.transferForm.reset();
      this.isTransferError = false;
    }
  }

  /**
   * Updates user cards
   */
  public requestUserCards() {
    this.userCards = this.cardService.getCurrentUserCards();
  }

  /**
   * Requests a report for specific card
   * @param {Card} card
   */
  public cardReportClicked(card: Card) {
    this.transactionsComponent.requestTransactions(card.iban);
    this.reportModal.open();
  }

  /**
   * Action payment handler
   */
  public paymentClicked() {
    this.paymentForm.controls.autoPeriod.setValue(this.autoPaymentPeriodType[0]);
    this.paymentForm.controls.autoType.setValue(this.autoPaymentType[0]);

    this.paymentProviders = this.paymentsService.getAvailablePayments().pipe(
      tap((providers: PaymentProvider[]) => {
        if (!this.paymentForm.value.serviceId) {
          this.paymentForm.patchValue({serviceId: providers[0].id});
        }
      })
    );
    this.paymentModal.open();
  }

  /**
   * Close handler of a payment modal
   * @param {boolean} isModalOpen
   */
  public paymentModalClosed(isModalOpen: boolean) {
    if (!isModalOpen) {
      this.paymentForm.reset();
    }
  }

  /**
   * Payment for a services
   */
  public makePayment() {
    const form: FormGroup = this.paymentForm;
    form.disable();

    const serviceId: string = form.value.serviceId;

    let payload: PaymentPayload;
    if (form.value.isAuto) {
      payload = new PaymentPayload(form.value.isAuto, this.selectedCard.iban, form.value.contractValue, form.value.amount,
        form.value.autoStartDatetime, form.value.autoType, form.value.autoPeriod);
    } else {
      payload = new PaymentPayload(form.value.isAuto, this.selectedCard.iban, form.value.contractValue, form.value.amount);
    }

    this.paymentsService.payService(serviceId, payload).subscribe(() => {
      this.paymentForm.enable();
      this.paymentModal.close();
      this.appAlertService.showAlert(new AppAlertParams('Payment was successful!', 3000, 'success'));
    }, (error: string) => {
      this.paymentForm.enable();
      this.paymentForm.setErrors({api: error});
    });
  }

  /**
   * Returns available contract types
   * @returns {Observable<string>}
   */
  public getContractType(): Observable<string> {
    return this.paymentProviders.pipe(
      map((providers: PaymentProvider[]) => {
        const provider: PaymentProvider = providers.find((prov: PaymentProvider) => prov.id === this.paymentForm.value.serviceId);

        return Object.keys(this.contractTypes).find((key: string) => this.contractTypes[key] === provider.contractType);
      })
    );
  }

  /**
   * Auto payment selection handler
   * @param {boolean} state
   */
  public autoPaymentSelected(state: boolean) {
    if (state) {
      this.paymentForm.controls.autoStartDatetime.setValidators(Validators.required);
    } else {
      this.paymentForm.controls.autoStartDatetime.clearValidators();
      this.paymentForm.controls.autoStartDatetime.updateValueAndValidity();
    }
  }
}
