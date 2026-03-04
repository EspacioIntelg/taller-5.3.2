import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto('https://automationteststore.com/');
  }

  async clickLoginOrRegister() {
    await this.page.getByText('Login or register', { exact: false }).click();
  }
}
