import {Component, OnInit, ViewChild} from '@angular/core';
import {Modal} from 'clarity-angular';
import {Observable} from 'rxjs/Observable';
import {Card, PaymentSystemType} from '../../shared/card';
import {CardService} from '../../shared/services/card.service';

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

  public userCards: Observable<Card[]>;
  public isBlockInAction: boolean = false;

  private cardService: CardService;
  private selectedCard: Card;

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  public ngOnInit() {
    this.userCards = this.cardService.getCurrentUserCards();
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
}
