/**
 * Component Name: Gov UK Accordion
 * Derived_From_Frontend_Version:v3.13.1
 * Created by: Simon Cook Updated by Harshpreet Singh Chhabra/Brenda Campbell
 **/
import { LightningElement, api, track } from 'lwc';

export default class GovAccordion extends LightningElement {

    @api sectionLabels = '';
    @api sectionLabelSummarys = '';
    @api sectionContents = '';

    @api labelShow;
    @api labelHide;
    @api labelShowAll;
    @api labelHideAll;

    @track sectionArray = [];
    @track openAndCLoseAllText = this.labelShowAll;

    connectedCallback(){

        let sectionLabelist = this.sectionLabels ? this.sectionLabels.split(';') : [];
        let sectionLabelSummaryList = this.sectionLabelSummarys ? this.sectionLabelSummarys.split(';') : [];
        let sectionContentList = this.sectionContents ? this.sectionContents.split('|') : [];

        let sectionObj = {
            secId : '',
            secContentId : '',
            secLabel : '',
            secSummary : '',
            secContent : ''
        };

        for(let i=0; i<sectionLabelist.length;i++){
            sectionObj.secId = 'Section' + i;
            sectionObj.secContentId = 'ContentSection' + i ;
            sectionObj.secLabel = sectionLabelist[i];
            sectionObj.secSummary = sectionLabelSummaryList[i];
            sectionObj.secContent = sectionContentList[i];
            this.sectionArray.push(sectionObj);
            sectionObj = {
                secId : '',
                secContentId : '',
                secLabel : '',
                secSummary : '',
                secContent : ''
                };
        }
    }

    handleclick(event){
        let targetId = event.target.dataset.id;
        let target = this.template.querySelector(`[data-id="Content${targetId}"]`);
        if(target.classList.value.includes("govuk-accordion__section--expanded")){
            target.classList.remove('govuk-accordion__section--expanded');
            target.setAttribute('aria-expanded','false');
        }else{
            target.classList.add('govuk-accordion__section--expanded');
            target.setAttribute('aria-expanded','true');
        }
    }
    
    handlebuttonclick(event){
        for(let i=0; i<this.sectionArray.length; i++){
            let target = this.template.querySelector(`[data-id="Content${this.sectionArray[i].secId}"]`);
            if(this.openAndCLoseAllText.includes('Close')){
                target.classList.remove('govuk-accordion__section--expanded');
                target.setAttribute('aria-expanded','false');
            }else{
                target.classList.add('govuk-accordion__section--expanded');
                target.setAttribute('aria-expanded','true');
            }
        }
        this.openAndCLoseAllText = this.openAndCLoseAllText.includes('Open') ? this.labelHideAll : this.labelShowAll ;
    }
}
