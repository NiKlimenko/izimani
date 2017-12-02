import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CardPayload, CardType, CurrencyType, PaymentSystemType} from '../../../shared/card';
import {AppAlertService} from '../../../shared/services/app-alert.service';
import {CardService} from '../../../shared/services/card.service';
import {AppAlertParams} from '../../app-alert/app-alert.component';

/**
 * Component to create cards
 */

@Component({
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent {

  public createCardForm: FormGroup;
  public paymentSystems: {[key: string]: PaymentSystemType};
  public cardTypes: CardType[];
  public currencyTypes: CurrencyType[];

  private cardService: CardService;
  private appAlertService: AppAlertService;

  /**
   * @param {CardService} cardService
   * @param {AppAlertService} appAlertService
   */
  constructor(cardService: CardService, appAlertService: AppAlertService) {
    this.cardService = cardService;
    this.appAlertService = appAlertService;
    this.paymentSystems = {
      Visa: 'visa',
      MasterCard: 'master_card'
    };
    this.cardTypes = ['standard', 'classic', 'gold'];
    this.currencyTypes = ['USD', 'EUR'];

    this.createCardForm = new FormGroup({
      userId: new FormControl(),
      paymentSystemType: new FormControl(this.getPaymentSystems()[0]),
      cardType: new FormControl(this.cardTypes[0]),
      currencyType: new FormControl(this.currencyTypes[0])
    });
  }

  /**
   * Create a new credit card
   */
  public createCard() {
    const form: FormGroup = this.createCardForm;
    form.disable();
    const payload: CardPayload =
      new CardPayload(form.value.userId, form.value.paymentSystemType, form.value.cardType, form.value.currencyType);

    this.cardService.createCard(payload).subscribe(() => {
      this.createCardForm.enable();
      this.appAlertService.showAlert(new AppAlertParams('A new bank account has been created successfully!', 3000, 'success'));
    }, (error: string) => {
      this.createCardForm.enable();
      this.createCardForm.setErrors({api: error});
    });
  }

  /**
   * Get available payment systems
   * @returns {string[]}
   */
  public getPaymentSystems(): string[] {
    return Object.keys(this.paymentSystems);
  }

  /**
   * Get available types of card
   * @returns {CardType[]}
   */
  public getCardTypes(): CardType[] {
    return this.cardTypes;
  }

  /**
   * Get available types of currency
   * @returns {CurrencyType[]}
   */
  public getCurrencyTypes(): CurrencyType[] {
    return this.currencyTypes;
  }
}
