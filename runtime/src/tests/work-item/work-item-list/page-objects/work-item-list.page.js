/**
 * Planner page object example module for work item list page
 * See: http://martinfowler.com/bliki/PageObject.html,
 * https://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings
 * @author ldimaggi@redhat.com
 * TODO - Complete the page object model pending completion of UI at: http://demo.almighty.io/
 */

'use strict';

/*
 * Work Item List Page Definition
 */

let testSupport = require('../testSupport');
let WorkItemDetailPage = require('./work-item-detail.page');
let WorkItemBoardPage = require('./work-item-board.page');
let CommonPage = require('./common.page');
let constants = require("../constants");
let until = protractor.ExpectedConditions;

/* Icons displayed after the detailed dialog button is clicked */
let detailedWorkItemIcons = [];
detailedWorkItemIcons["userstory"] = ".card-pf-icon-circle.fa.fa-bookmark";
detailedWorkItemIcons["valueproposition"] = ".card-pf-icon-circle.fa.fa-gift";
detailedWorkItemIcons["fundamental"] = ".card-pf-icon-circle.fa.fa-bank";
detailedWorkItemIcons["experience"] = ".card-pf-icon-circle.fa.fa-map";
detailedWorkItemIcons["feature"] = ".card-pf-icon-circle.fa.fa-mouse-pointer";
detailedWorkItemIcons["bug"] = ".card-pf-icon-circle.fa.fa-bug ";

class WorkItemListPage {

 constructor(login) {
   if(login==true) {
    let url = encodeURIComponent(JSON.stringify({
      access_token: 'somerandomtoken',
      expires_in: 1800,
      refresh_expires_in: 1800,
      refresh_token: 'somerandomtoken',
      token_type: "bearer"
    }));
    browser.get("http://localhost:8088/?token_json="+url);
  }
   else {
     browser.get("http://localhost:8088/");
   }
 };

 /* Select the space in which the tests will be run */
 get spaceDropdown (){
   return element(by.css(".ng-valid"));
 }
 clickOnSpaceDropdown (){
   return this.spaceDropdown.click();
 }
 selectSpaceDropDownValue  (index) {
   index++;
   return element(by.xpath("//select[contains(@class,'ng-valid')]/option[" + index + "]")).click();
 }

 workItemByURLId (workItemId) {
   browser.get("http://localhost:8088/work-item/list/detail/"+ workItemId);
    var theDetailPage = new WorkItemDetailPage (workItemId);
 }
 clickCodeMenuTab () {
    return element(by.id("header_menuCode")).click();
  }
 get workItemListButton () {
     return element(by.id("header_menuWorkItemList"));
 }

 clickWorkItemListButton() {
   browser.wait(until.presenceOf(this.workItemListButton), constants.WAIT, 'Failed to find workItemListButton');
   return this.workItemListButton.click();
 }

 get boardButton () {
     return element(by.id("header_menuBoard"));
 }

 get clickBoardButton () {
   this.boardButton.click();
   return new WorkItemBoardPage();
 }

 get userToggle () {
     return element(by.id("header_dropdownToggle"));
 }

 clickUserToggle () {
   return this.userToggle.click();
 }

/* Page elements - bottom of the page - work item quick add */

 get workItemQuickAddTitle () {
   return element(by.css(".f8-quickadd-input"));
  }

 typeQuickAddWorkItemTitle (keys) {
   browser.wait(until.presenceOf(this.workItemQuickAddTitle), constants.WAIT, 'Failed to find workItemQuickAddTitle');
   return this.workItemQuickAddTitle.sendKeys(keys);
 }

 get workItemQuickAddDesc () {
   return element(by.css(".f8-quickadd-desc"));
 }

 typeQuickAddWorkItemDesc (keys) {
   browser.wait(until.presenceOf(this.workItemQuickAddDesc), constants.WAIT, 'Failed to find workItemQuickAddDesc');
   return this.workItemQuickAddDesc.sendKeys(keys);
 }

 /* Access the Kebab element relative to its parent workitem */
 workItemKebabButton (parentElement) {
   browser.wait(until.presenceOf(parentElement.element(by.id("dropdownKebabRight"))), constants.WAIT, 'Failed to find clickWorkItemKebabButton');
   return parentElement.element(by.id("dropdownKebabRight"));
 }
 clickWorkItemKebabButton (parentElement) {
   browser.wait(until.presenceOf(parentElement.element(by.id("dropdownKebabRight"))), constants.WAIT, 'Failed to find clickWorkItemKebabButton');
   return parentElement.element(by.id("dropdownKebabRight")).click();
 }

 KebabButtonById () {
   return element(by.id("dropdownKebabRight"));
 }

 /* Login functions */

 clickLoginButton () {
   return element(by.id('header_rightDropdown')).all(By.tagName('a')).get(0).click();
 }

 clickLogoutButton () {
   return element(by.linkText('Logout'));
 }

 signInGithub (gitusername,gitpassword) {
   element(By.css('.fa.fa-github')).click();
   browser.ignoreSynchronization = true;
   var until = protractor.ExpectedConditions;
   browser.wait(until.presenceOf(element(by.xpath('.//*[@id="login"]/form/div[3]/div/p'))), 80000, 'Sign into');
   element(By.id('login_field')).sendKeys(gitusername);
   element(By.id('password')).sendKeys(gitpassword);
   return  element(By.css('.btn.btn-primary.btn-block')).click();
 }

  /* Access the Kebab element relative to its parent workitem */
  workItemKebabDeleteButton (parentElement) {
    browser.wait(until.presenceOf(parentElement.element(by.css('.workItemList_Delete'))), constants.WAIT, 'Failed to find clickWorkItemKebabButton');
    return parentElement.element(by.css('.workItemList_Delete'));
  }
  workItemKebabAssocateIterationButton (parentElement) {
    browser.wait(until.presenceOf(parentElement.element(by.css('.f8-wi__list-iteration'))), constants.WAIT, 'Failed to find clickWorkItemKebabButton');
    return parentElement.element(by.css('.f8-wi__list-iteration'));
  }
  clickWorkItemKebabAssociateIterationButton (parentElement) {
    return this.workItemKebabAssocateIterationButton (parentElement).click();
  }
  clickDropDownAssociateIteration (selectIteration){
     this.clickOnIterationDropDown().click();
     return element(by.linkText(selectIteration)).click();
  }
  clickAssociateSave  (){
    return element(by.id("associate-iteration-button")).click();
  }
  reassociate (){
    return element(by.linkText("Reassociate"));
  }
  clickAssociateCancel  (){
    return element(by.id("cancel-iteration-button")).click();
  }
  clickWorkItemKebabDeleteButton (parentElement) {
    return this.workItemKebabDeleteButton (parentElement).click();
  }

  parentIterationDropDown (){
    return element(by.id('parent-iteration'));
  }

  clickIterationById(text){
    return this.IterationById(text).click();
  }

  IterationById(text){
    return element(by.id('iteration-' + text));
  }
  clickParentIterationDropDown(){
    return this.parentIterationDropDown().click();
  }

  searchParentIteration (text,append){
    if (!append) { this.parentIterationDropDown().clear(text) };
    return this.parentIterationDropDown().sendKeys(text);
  }

  selectParentIterationById  (ids){
    return this.parentIterationById(ids).click();
  }

  parentIterationById  (ids){
    return element(by.id("iteration-"+ids));
  }

  get workItemPopUpDeleteConfirmButton () {
    return element(by.buttonText('Confirm'));
  }

  clickWorkItemPopUpDeleteConfirmButton () {
    browser.wait(until.elementToBeClickable(this.workItemPopUpDeleteConfirmButton), constants.WAIT, 'Failed to find workItemPopUpDeleteConfirmButton');
    return this.workItemPopUpDeleteConfirmButton.click();
  }

  get workItemPopUpDeleteCancelConfirmButton () {
    return element(by.buttonText('Cancel'));
  }

  clickWorkItemPopUpDeleteCancelConfirmButton () {
    browser.wait(until.presenceOf(this.workItemPopUpDeleteCancelConfirmButton), constants.WAIT, 'Failed to find clickWorkItemPopUpDeleteCancelConfirmButton');
    return this.workItemPopUpDeleteCancelConfirmButton.click();
  }

  get openButton () {
    return element(by.css(".f8-quickadd__addwi-savebtn"));
  }

  quickAddbuttonById () {
    return element(by.css("f8-quickadd-container"));
  }

  clickWorkItemQuickAdd () {
    browser.wait(until.presenceOf(this.openButton), constants.WAIT, 'Failed to find the open button');
    return this.openButton.click();
  }

  get saveButton () {
    return  element(by.css(".f8-quickadd__wiblk-btn-add"));
  }

  clickQuickAddSave () {
    browser.wait(until.presenceOf(this.saveButton), constants.WAIT, 'Failed to find the saveButton');
    return this.saveButton.click();
  }

  get cancelButton () {
    return element(by.css(".f8-quickadd__wiblk-btn-close"));
  }

  clickQuickAddCancel () {
    browser.wait(until.presenceOf(this.cancelButton), constants.WAIT, 'Failed to find the cancelButton');
    return this.cancelButton.click();
  }

  /* Page elements - work item list */

  get allWorkItems () {
    return element.all(by.css(".work-item-list-entry"));
  }

  /* xpath = //alm-work-item-list-entry[.//text()[contains(.,'Some Title 6')]]   */
  workItemByTitle (titleString) {
    // return element(by.xpath("//alm-work-item-list-entry[.//text()[contains(.,'" + titleString + "')]]"));
    return element(by.xpath("//alm-tree-list-item[.//text()[contains(.,'" + titleString + "')]]"));
  }

  get firstWorkItem () {
    return element.all(by.css(".work-item-list-entry")).first();
  }

  get lastWorkItem () {
    return element.all(by.css(".work-item-list-entry")).last();
  }

  /* Title element relative to a workitem */
  workItemTitle (workItemElement) {
    return workItemElement.element(by.css(".f8-wi__list-title")).element(by.css("p")).getText();
  }

  clickWorkItemTitle (workItemElement, idText) {
    workItemElement.element(by.css(".f8-wi__list-title")).element(by.css("p")).click();
    var theDetailPage = new WorkItemDetailPage (idText);
    var until = protractor.ExpectedConditions;
    //browser.wait(until.presenceOf(theDetailPage.workItemDetailPageTitle), constants.WAIT, 'Detail page title taking too long to appear in the DOM');
    browser.wait(testSupport.waitForText(theDetailPage.clickWorkItemDetailTitle), constants.WAIT, "Title text is still not present");
    return theDetailPage;
  }

  /* Description element relative to a workitem */
  workItemDescription (workItemElement) {
    return workItemElement.element(by.css(".f8-wi__list-desc")).getText();
  }

  /* Icon element relative to a workitem */
  workItemIcon (workItemElement) {
    return workItemElement.element(by.css(".type.f8-wi__list-witype")).getText();
  }

  workItemByIndex (itemNumber) {
    return element.all(by.css(".work-item-list-entry")).get(itemNumber);
  }

  workItemByNumber (itemNumber) {
    var xPathString = "workItemList_OuterWrap_" + itemNumber;
    return element(by.id(xPathString));
  }

  kebabByNumber (itemNumber) {
    var XPathString = "workItemList_OuterWrap_" + itemNumber +"/div/div[2]/div";
    return element(by.id(XPathString));
  }

  workItemViewButton (parentElement) {
    return parentElement.element(By.css( ".list-view-pf-main-info" ));
  }

  workItemViewId (parentElement) {
    return parentElement.element(By.css( ".list-view-pf-left.type.f8-wi__list-witype" ));
  }

  workItemViewTitle (parentElement) {
    return parentElement.element(By.css( ".list-group-item-heading.f8-wi__list-title" ));
  }

  workItemViewDescription (parentElement) {
    return parentElement.element(By.css( ".list-group-item-text.f8-wi__list-desc" ));
  }

  /*
   * When the Work Item 'View Detail' page is opened, there can be a delay of a few seconds before
   * the page contents are displayed - the browser.wait statement covers this wait for the title
   * of the page - there is a further delay before the values of the elements on the page are displayed.
   */
  clickWorkItemViewButton (button, idValue) {
    button.click();
    var theDetailPage = new WorkItemDetailPage (idValue);
    var until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(theDetailPage.workItemDetailPageTitle), constants.WAIT, 'Detail page title taking too long to appear in the DOM');
    browser.wait(testSupport.waitForText(theDetailPage.workItemDetailTitle), constants.WAIT, "Title text is still not present");
    return theDetailPage;
  }

  workItemDeleteButton (parentElement) {
    return parentElement.element(By.css( ".btn.btn-default.delete-button.workItemList_deleteListItemBtn" ));
  }

  clickWorkItemDeleteButton (button) {
    browser.wait(until.presenceOf(button), constants.WAIT, 'Failed to find the button');
    return button.click();
  }

  /* User assignment dropdown */
  get filterDropdown () {
    return  element(by.id("wi_filter_dropdown"));
  }
  clickFilterDropdown () {
    return this.filterDropdown.click();
  }

  /* Close filters */
  get closeFilters () {
    return  element(by.css(".close-filter"));
  }
  clickCloseFilters () {
    return this.closeFilters.click();
  }

  /* Workitem filter pulldown */
  get workItemFilterFieldsPulldown () {
    return element(by.css(".filter-fields.dropdown-toggle"));
  }
  clickWorkItemFilterFieldsPulldown () {
    return this.workItemFilterFieldsPulldown.click();
  }

  get filterByAssignee () {
    browser.wait(until.presenceOf(element(by.xpath("//li[2]/a[@class='filter-field dropdown-item']"))), constants.WAIT, 'Failed to filter by Assignee Type');
    return element(by.xpath("//li[2]/a[@class='filter-field dropdown-item']"));
  }
  clickFilterByAssignee () {
    return this.filterByAssignee.click();
  }

  get filterByArea () {
    browser.wait(until.presenceOf(element(by.xpath("//li[3]/a[@class='filter-field dropdown-item']"))), constants.WAIT, 'Failed to filter by Area Type');
    return element(by.xpath("//li[3]/a[@class='filter-field dropdown-item']"));
  }
  clickFilterByArea () {
    return this.filterByArea.click();
  }

  get filterByWorkitemType () {
    browser.wait(until.presenceOf(element(by.xpath("//li[4]/a[@class='filter-field dropdown-item']"))), constants.WAIT, 'Failed to filter by Workitem Type');
    return element(by.xpath("//li[4]/a[@class='filter-field dropdown-item']"));
  }
  clickFilterByWorkitemType () {
    return this.filterByWorkitemType.click();
  }

  get workItemFilterPulldownDefault () {
    browser.wait(until.presenceOf(element(by.css("div.pull-left.typeahead-input-container.dropdown-toggle > input.form-control"))), constants.WAIT, 'Failed to find filter-by dropdown list');
    return element(by.css("div.pull-left.typeahead-input-container.dropdown-toggle > input.form-control"));
  }
  clickWorkItemFilterPulldownDefault () {
    return this.workItemFilterPulldownDefault.click();
  }

  get workItemFilterPulldownEdited () {
    browser.wait(until.presenceOf(element(by.css("span.filter-option.pull-left"))), constants.WAIT, 'Failed to find filter-by dropdown list');
    return element(by.css("span.filter-option.pull-left"));
  }
  clickWorkItemFilterPulldownEdited () {
    return this.workItemFilterPulldownEdited.click();
  }

  filterBy (val) {
    browser.wait(until.presenceOf(element(by.xpath(".//*//li//text()[contains(.,' "+val+" ')]/.."))), constants.WAIT, 'Failed to find filter input field');
    return element(by.xpath(".//*//li//text()[contains(.,' "+val+" ')]/.."));
  }
  clickFilterBy (val) {
    return this.filterBy(val).click();
  }

  /* Access the user assignment filter dropdown - 'assign to me' filter*/
  get filterAssignToMe () {
    browser.wait(until.presenceOf(element(by.xpath(".//*//li//text()[contains(.,'(me)')]/.."))), constants.WAIT, 'Failed to find assign to me');
    return element(by.xpath(".//*//li//text()[contains(.,'(me)')]/.."));
  }
  clickFilterAssignToMe () {
    this.filterAssignToMe.click();
  }

    /* Access the Area assignment filter dropdown - 'Area 0' filter*/
  get filterAssignArea () {
    browser.wait(until.presenceOf(element(by.xpath(".//*//li//text()[contains(.,'Area 0')]/.."))), constants.WAIT, 'Failed to find assign Area');
    return element(by.xpath(".//*//li//text()[contains(.,'Area 0')]/.."));
  }
  clickFilterAssignArea () {
    this.filterAssignArea.click();
  }

    /* Access the Workitem Type assignment filter dropdown - 'WI Type - Experience' filter*/
  get filterAssignWIType () {
    browser.wait(until.presenceOf(element(by.xpath(".//*//li//text()[contains(.,'Experience')]/.."))), constants.WAIT, 'Failed to find assign Area');
    return element(by.xpath(".//*//li//text()[contains(.,'Experience')]/.."));
  }
  clickFilterAssignWIType () {
    this.filterAssignWIType.click();
  }

  get activeFilters () {
    return element(by.xpath(".//*//text()[contains(.,'Active filters:')]"));
  }
  get currentActiveFilter () {
    return element(by.css(".active-filter.label.label-info"));
  }
  get closeCurrentActiveFilter () {
    return element(by.css(".pficon.pficon-close"));
  }
  filterDropdownId () {
    return  element(by.id("wi_filter_dropdown"));
  }

  /* Adding a new workitem through the dialog */
  get detailedDialogButton () {
    /* Changed from element(by.css(".with-cursor-pointer")) - as there were multiple matches */
    return element(by.css(".add-button"));
 }

  clickDetailedDialogButton () {
    return this.detailedDialogButton.click();
  }

  /* Adding a new user story workitem through the dialog */
  detailedIcon (workItemIcon) {
    /* Usage: detailedUserStoryIcon("userstory")  */
    return  element(by.css(detailedWorkItemIcons[workItemIcon]));
  }

  clickDetailedIcon (workItemIcon) {
    /* Usage: clickDetailedUserStoryIcon("userstory")  */
    this.detailedIcon(workItemIcon).click();
    var theDetailPage = new WorkItemDetailPage ();
    return theDetailPage;


  }
  userStoryIconWIT  (){
    return element(by.css('.card-pf-icon-circle.fa.fa-bookmark'));
  }
  clickUserStoryWItype  ()  {
    return this.userStoryIconWIT.click();
  }
  valuePropositonWItype  ()  {
   return element(by.css('.card-pf-icon-circle.fa.fa-gift'));
  }
  clickValuePropositonWItype  ()  {
    return this.valuePropositonWItype.click();
  }
  fundamentalWItype  ()  {
   return element(by.css('.card-pf-icon-circle.fa.fa-bank'));
  }
  clickFundamentalWItype  ()  {
    return this.fundamentalWItype.click();
  }
  plannerWItype(){
    return element(by.css('.card-pf-icon-circle.fa.fa-paint-brush'));
  }
  clickPalnnerWItype  ()  {
    return this.plannerWItype.click();
  }
  featureWItype() {
    return element(by.css('.card-pf-icon-circle.fa.fa-mouse-pointer'));
  }
  clickFeatureWItype  ()  {
    return this.featureWItype.click();
  }
  bugWItype(){
    return element(by.css('.card-pf-icon-circle.fa.fa-bug'));
  }
  clickBugWItype  ()  {
    return this.bugWItype.click();
  }
  experienceWIType(){
    return element(by.css('.card-pf-icon-circle.fa.fa-map'));
  }
  clickExperienceWItype  ()  {
    return this.experienceWIType.click();
  }



  /* Checkbox relative to a workitem */
  workItemCheckbox (workItemElement) {
    return workItemElement.element(by.css(".row-cbh>input"));
  }

 /* Click checkbox relative to a workitem */
  clickWorkItemCheckbox (workItemElement) {
    return this.workItemCheckbox (workItemElement).click();
  }

 /* Is checkbox relative to a workitem selected? */
  isWorkItemCheckboxSelected (workItemElement) {
    browser.actions().mouseMove(workItemElement).perform();
    return this.workItemCheckbox (workItemElement).isSelected();
  }

  /* Workitem move pulldown */
  get workItemMovePulldown () {
    return element(by.css(".dropdown.move-dropdown"));
  }

  /* Workitem move pulldown */
  clickWorkItemMovePulldown () {
    return this.workItemMovePulldown.click();
  }

  workItemMovePulldownTop (parentElement) {
    return parentElement.element(by.xpath(".//*//li[.//text()[contains(.,'Move to Top')]]"));
  }

  clickWorkItemMovePulldownTop (parentElement) {
    return this.workItemMovePulldownTop(parentElement).click();
  }

  workItemMovePulldownBottom (parentElement) {
    return parentElement.element(by.xpath(".//*//li[.//text()[contains(.,'Move to Bottom')]]"));
  }

  clickWorkItemMovePulldownBottom (parentElement) {
    return this.workItemMovePulldownBottom(parentElement).click();
  }

  workItemMovePulldownUp (parentElement) {
    return parentElement.element(by.xpath(".//*//li[.//text()[contains(.,'Move Up')]]"));
  }

  clickWorkItemMovePulldownUp (parentElement) {
    return this.workItemMovePulldownUp(parentElement).click();
  }

  workItemMovePulldownDown (parentElement) {
    return parentElement.element(by.xpath(".//*//li[.//text()[contains(.,'Move Down')]]"));
  }

  clickWorkItemMovePulldownDown (parentElement) {
    return this.workItemMovePulldownDown(parentElement).click();
  }
  /* Access the Kebab 'move to top' element relative to its parent workitem */
  workItemKebabMoveToTopButton (parentElement) {
    browser.wait(until.presenceOf(parentElement.element(by.css('.f8-wi__list-movetop'))), constants.WAIT, 'Failed to find clickWorkItemKebabButton');
    return parentElement.element(by.css('.f8-wi__list-movetop'));
  }
  clickWorkItemKebabMoveToTopButton (parentElement) {
    return this.workItemKebabMoveToTopButton (parentElement).click();
  }

  /* Access the Kebab 'move to bottom' element relative to its parent workitem */
  workItemKebabMoveToBottomButton (parentElement) {
    browser.wait(until.presenceOf(parentElement.element(by.css('.f8-wi__list-movebtm'))), constants.WAIT, 'Failed to find clickWorkItemKebabButton');
    return parentElement.element(by.css('.f8-wi__list-movebtm'));
  }
  clickWorkItemKebabMoveToBottomButton (parentElement) {
    return this.workItemKebabMoveToBottomButton (parentElement).click();
  }

  iterationAddButton  (){
    return element(by.id('add-iteration-icon'));
  }

  /* Iterations Page object model */
  clickIterationKebab (index){
    return element(by.xpath("(//div[@class='f8-itr-entry']//button[@class='btn btn-link dropdown-toggle'])["+index+"]")).click();
  }
  clickEditIterationKebab (){
    return element(by.linkText ("Edit")).click();
  }
  clickStartIterationKebab (){
    return element(by.linkText ("Start")).click();
  }
  clickCloseIterationKebab (){
    return element(by.linkText ("Close")).click();
  }
  clickCloseIterationConfirmation() {
    return element(by.id('create-iteration-button')).click();
  }
  clickChildIterationKebab (){
    return element(by.linkText ("Create child")).click();
  }
  linkTextSearch (text){
    return element(by.linkText (text));
  }
  get expandCurrentIterationIcon () {
    return element(by.xpath (".//text()[contains(.,'Current Iteration')]"));
  }

  clickExpandCurrentIterationIcon () {
    return this.expandCurrentIterationIcon.click();
  }

  get expandFutureIterationIcon () {
    return element(by.xpath (".//text()[contains(.,'Future Iterations')]/.."));
  }

  clickExpandFutureIterationIcon () {
    return this.expandFutureIterationIcon.click();
  }

  get expandPastIterationIcon () {
    return element(by.xpath (".//text()[contains(.,'Past Iterations')]/.."));
  }

  clickExpandPastIterationIcon () {
    return this.expandPastIterationIcon.click();
  }

  get futureIterations () {
    return element.all(by.xpath (".//text()[contains(.,'Future Iterations')]/../../../../ul/li"));
  }

  get firstFutureIteration () {
    return element.all(by.xpath (".//text()[contains(.,'Future Iterations')]/../../../../ul/li")).first();
  }

  getIterationCounter (parentElement) {
    return parentElement.element(by.css(".badge"));
  }

  get iterationCount(){
    return element(by.css('.iteration-count')).getText();
  }

  IterationByName(name){
    return element(by.xpath(".//text()[contains(.,'" + name + "')]/../../../.."));
  }

  get lastFutureIteration () {
    return element.all(by.xpath (".//text()[contains(.,'Future Iterations')]/../../../../ul/li")).last();
  }

  get pastIterations () {
    return element.all(by.xpath (".//text()[contains(.,'Past Iterations')]/../../../ul"));
  }

  get firstPastIteration () {
    return element.all(by.xpath (".//text()[contains(.,'Past Iterations')]/../../../ul/li")).first();
  }

  get lastPastIteration () {
    return element.all(by.xpath (".//text()[contains(.,'Past Iterations')]/../../../ul/li")).last();
  }

  firstCurrentIteration () {
    return element.all(by.xpath (".//text()[contains(.,'Current Iterations')]/../../../../../ul/li")).first();
  }

  clickIterationAddButton () {
    return this.iterationAddButton().click();
  }

  clickIterationCreateLabel  (){
    return element(by.css(".f8-itr__add")).click();
  }

  get iterationTitleFromList  (){
    return element(by.css('.f8-itr-name'));
  }

  get iterationTitleFromModal  (){
    return element(by.id("iteration-name"));
  }

  setIterationTitle  (newTitleString,append){
    if (!append) { this.iterationTitleFromModal.clear(newTitleString) };
    return this.iterationTitleFromModal.sendKeys(newTitleString);
  }
  get iterationDescription  (){
    return element(by.id("iteration-description"));
  }
  setIterationDescription  (newString,append){
     if (!append) { this.iterationDescription.click().clear(newString) };
    return this.iterationDescription.click().sendKeys(newString);
  }
  get createItreationButton (){
    return element(by.id('create-iteration-button'));
  }
  get cancelIterationButton  (){
    return element(by.id('cancel-iteration-button'));
  }
  clickCreateIteration  (){
    return this.createItreationButton.click();
  }
  clickCancelIteration  (){
    return this.cancelIterationButton.click();
  }
  getIterationDialogTitle(){
    return element(by.css('.modal-title')).getText();
  }
  getHelpBoxIteration (){
    return element(by.id('iteration-help-label')).getText();
  }
  closeIterationDialog(){
    return element(by.css('.close')).click();
  }
  toastNotification (){
    return element(by.css('.toast-notification-container'));
  }
  clickOnIterationDropDown(){
    return element(by.id('iteration-select-dropdown'));
  }

  get forceActiveLabel(){
    return element(by.css('.f8-active-label'));
  }

  get activeIterationButton () {
    return element(by.css("#active-switch > label"));
  }

  clickActiveIterationButton () {
    return this.activeIterationButton.click();
  }

  activeIterationButtonStatus (){
    return this.activeIterationButton.element(by.css('input')).getAttribute('checked');
  }

  getPortfolio() {
    return element(by.id('portfolio'));
  }

  clickPortfolio() {
    return this.getPortfolio().click();
  }

  getRequirements() {
    return element(by.id('requirements'));
  }

  clickRequirements() {
    return this.getRequirements().click();
  }

  getExecution() {
    return element(by.id('execution'));
  }
}

module.exports = WorkItemListPage;
