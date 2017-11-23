import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Modal} from 'clarity-angular';
import {Observable} from 'rxjs/Observable';
import {finalize} from 'rxjs/operators';
import {Card, PaymentSystemType} from '../../../shared/card';
import {AppAlertService} from '../../../shared/services/app-alert.service';
import {CardService} from '../../../shared/services/card.service';
import {TransferPayload} from '../../../shared/transfer-payload';
import {AppAlertParams} from '../../app-alert/app-alert.component';

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

  public userCards: Observable<Card[]>;
  public selectedCard: Card;

  public isBlockInAction: boolean = false;
  public isTransferInAction: boolean = false;

  public transferForm: FormGroup;
  public transferErrorMessage: string;
  public isTransferError: boolean = false;

  private cardService: CardService;
  private appAlertService: AppAlertService;

  constructor(cardService: CardService, appAlertService: AppAlertService) {
    this.cardService = cardService;
    this.appAlertService = appAlertService;

    this.transferForm = new FormGroup({
      cardNumber: new FormControl(),
      cvv: new FormControl(),
      amount: new FormControl()
    });
  }

  public ngOnInit() {
    this.requestUserCards();
  }

  public formatCardNumber(rawCardNumber: string): string {
    return rawCardNumber.replace(/-/g, ' ');
  }

  public formatCardDate(rawCardDate: string): string {
    const date: Date = new Date(rawCardDate);

    return `${date.getMonth()}/${date.getUTCFullYear() % 100}`;
  }

  public getCardPaymentSystemClass(cardType: PaymentSystemType): object {
    return {
      ccs: true,
      'ccs-visa': cardType === 'visa',
      'ccs-mastercard': cardType === 'master_card'
    };
  }

  public cardActionHandle(card: Card) {
    this.selectedCard = card;
  }

  public blockSelectedCard() {
    this.isBlockInAction = true;
    this.cardService.lockCard(this.selectedCard.iban).subscribe(() => {
      this.selectedCard.isLocked = true;
      this.isBlockInAction = false;
      this.blockCardModal.close();
    });
  }

  public unBlockSelectedCard() {
    this.isBlockInAction = true;
    this.cardService.unLockCard(this.selectedCard.iban).subscribe(() => {
      this.selectedCard.isLocked = false;
      this.isBlockInAction = false;
      this.unBlockCardModal.close();
    });
  }

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

  public transferModalClosed(isModalOpen: boolean) {
    if (!isModalOpen) {
      this.transferForm.reset();
      this.isTransferError = false;
    }
  }

  public requestUserCards() {
    this.userCards = this.cardService.getCurrentUserCards();
  }
}
