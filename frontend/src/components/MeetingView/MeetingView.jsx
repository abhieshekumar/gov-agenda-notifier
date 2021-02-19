import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './MeetingView.scss';

import NavBarHeader from '../NavBarHeader/NavBarHeader';
import Header from '../Header/Header';
import ParticipateView from './ParticipateView/ParticipateView';
import AgendaView from './AgendaView/AgendaView';

function makeTestSubItem(parentIndex, index, status) {
  return {
    id: `${index}`,
    meetingId: `${parentIndex}`,
    title: `${parentIndex}.${index} Agenda Item`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nisl euismod, tristique leo sit amet, eleifend enim.',
    status,
    items: [],
  };
}

function makeTestItem(index) {
  // eslint-disable-next-line no-nested-ternary
  const status = index <= 2 ? 'Completed' : index === 3 ? 'In Progress' : 'Pending';
  return {
    id: index,
    title: `${index} Agenda Group`,
    description: '',
    status,
    items: [1, 2, 3, 4].map((i) => makeTestSubItem(index, i, status)),
  };
}

const TEST_ITEMS = [1, 2, 3, 4, 5].map(makeTestItem);

/**
 * Component that displays a list of a meeting's agenda items.
 * Utilizes react-accessible-accordion to display groups of items.
 *
 * state:
 *    agendaItems
 *      An array of the current meeting's agenda items
 *    showAgendaView
 *      A boolean value indicating if the Agenda or Participate View is shown
 *    navToggled
 *      A boolean value indicating if the header nav component is open
 */

function MeetingView() {
  const { t } = useTranslation();

  const [agendaItems, setAgendaItems] = useState([]);
  const [showAgendaView, setShowAgendaView] = useState(true);
  const [navToggled, setNavToggled] = useState(false);

  function handleToggle() {
    setNavToggled(!navToggled);
  }

  useEffect(() => {
    async function fetchAgendaItems() {
      // TODO: https://github.com/codeforsanjose/gov-agenda-notifier/issues/88
      setTimeout(() => setAgendaItems(TEST_ITEMS), 2000); // MOCK API CALL
    }
    fetchAgendaItems();
  }, []);

  return (
    <div className="meeting-view">
      <NavBarHeader toggled={navToggled} handleToggle={handleToggle} />
      <Header />

      <div className="view-toggle">
        <div className={showAgendaView ? 'view-active' : ''}>
          <button
            type="button"
            onClick={() => setShowAgendaView(true)}
          >
            {t('meeting.tabs.agenda.label')}
          </button>
        </div>
        <div className={showAgendaView ? '' : 'view-active'}>
          <button
            type="button"
            onClick={() => setShowAgendaView(false)}
          >
            {t('meeting.tabs.participate.label')}
          </button>
        </div>
      </div>

      {showAgendaView ? <AgendaView agendaItems={agendaItems} /> : <ParticipateView />}
    </div>
  );
}

export default MeetingView;
