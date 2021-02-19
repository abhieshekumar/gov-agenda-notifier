import React from 'react';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './MeetingListGroup.scss';

import MeetingListItem from './MeetingListItem';

function MeetingListGroup({ month, year, meetings }) {

  return (
    <div className="MeetingListGroup">
      <AccordionItem className="AgendaGroup">
        <AccordionItemHeading className="group-header">
          <AccordionItemButton className="group-button">
            <div className="button-text">
              <div className="group-main-text">{month}</div>
              <div className="group-sub-text">{year}</div>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="group-items">
          {meetings.map((item) => <MeetingListItem key={item.id} item={item} />)}
        </AccordionItemPanel>
      </AccordionItem>
    </div>
  );
}

export default MeetingListGroup;
