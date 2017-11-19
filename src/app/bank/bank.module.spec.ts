import { BankModule } from './bank.module';

describe('BankModule', () => {
  let entryModule: BankModule;

  beforeEach(() => {
    entryModule = new BankModule();
  });

  it('should create an instance', () => {
    expect(entryModule).toBeTruthy();
  });
});
