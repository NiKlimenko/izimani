import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Modal} from 'clarity-angular';
import {Observable} from 'rxjs/Observable';
import {finalize, tap} from 'rxjs/operators';
import {Card, CurrencyType} from '../../../shared/card';
import {AppAlertService} from '../../../shared/services/app-alert.service';
import {CardService} from '../../../shared/services/card.service';
import {AppAlertParams} from '../../app-alert/app-alert.component';

/**
 * All cards component
 */

@Component({
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent {

  @ViewChild('fundCardModal')
  public fundCardModal: Modal;

  public isCardsLoading: boolean = false;
  public cards: Observable<Card[]>;
  public cardsCount: number;
  public deleteCardError: string;
  public paymentSystems: {[key: string]: string};
  public fundCardForm: FormGroup;
  public currencyTypes: CurrencyType[];

  private cardService: CardService;
  private appAlertService: AppAlertService;
  private selectedCard: Card;

  /**
   * @param {CardService} cardService
   * @param {AppAlertService} appAlertService
   */
  constructor(cardService: CardService, appAlertService: AppAlertService) {
    this.cardService = cardService;
    this.appAlertService = appAlertService;
    this.paymentSystems = {
      visa: 'Visa',
      master_card: 'MasterCard'
    };
    this.currencyTypes = ['USD', 'EUR'];
    this.fundCardForm = new FormGroup({
      amount: new FormControl(),
      currencyType: new FormControl(this.currencyTypes[0])
    });
    this.requestAllCards();
  }

  /**
   * Deletes provided card
   * @param {Card} card
   */
  public deleteCard(card: Card) {
    this.isCardsLoading = true;
    this.cardService.deleteCard(card.iban).pipe(
      finalize(() => this.isCardsLoading = false)
    ).subscribe(() => {
      delete this.deleteCardError;
      this.requestAllCards();
    }, (error: string) => this.deleteCardError = error);
  }

  /**
   * Get available payment systems
   * @returns {string[]}
   */
  public getCardPaymentSystem(card: Card): string {
    return this.paymentSystems[card.paymentSystemType];
  }

  /**
   * Get available types of currency
   * @returns {CurrencyType[]}
   */
  public getCurrencyTypes(): CurrencyType[] {
    return this.currencyTypes;
  }

  /**
   * Replenishment click handler
   * @param {Card} card
   */
  public onReplenish(card: Card) {
    this.selectedCard = card;
    this.fundCardForm.reset();
    this.fundCardForm.patchValue({currencyType: this.currencyTypes[0]});
    this.fundCardModal.open();
  }

  /**
   * Funding of the selected card
   */
  public fundCard() {
    const form: FormGroup = this.fundCardForm;
    form.disable();
    const amount: number = form.value.amount;
    const currencyType: CurrencyType = form.value.currencyType;

    this.cardService.fundCard(this.selectedCard.iban, amount, currencyType).subscribe(() => {
      this.fundCardModal.close();
      this.requestAllCards();
      this.appAlertService.showAlert(new AppAlertParams('Account successfully credited!', 3000, 'success'));
    }, (error: string) => {
      form.enable();
      form.setErrors({api: error});
    });
  }

  private requestAllCards() {
    this.isCardsLoading = true;
    this.cards = this.cardService.getAllCards().pipe(
      tap((cards: Card[]) => this.cardsCount = cards.length),
      finalize(() => this.isCardsLoading = false)
    );
  }
}
