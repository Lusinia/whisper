import { BoogyForumPage } from './app.po';

describe('boogy-forum App', function() {
  let page: BoogyForumPage;

  beforeEach(() => {
    page = new BoogyForumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
