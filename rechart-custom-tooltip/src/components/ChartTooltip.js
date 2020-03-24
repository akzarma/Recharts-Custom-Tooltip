import React from 'react';
import PropTypes from 'prop-types';

const ChartTooltip = ({ data = [], onCardClick }) => {

  const getCard = (payload, i) => (
    <div onClick={() => onCardClick(payload)} >

      <div className="graph-tooltip">
        <h4 className="ellipsis-div">{payload.title}</h4>
        <div className="tooltip-tags">
          <div className="tooltip-category">
            Category: {payload.category}
          </div>
          <div className="tooltip-like">
            {payload.votes} likes
          </div>
        </div>
        <div className="tooltip-expect">
          <div className="tooltip-time">
            <div className="tooltip-time-label">
              label
            </div>
            <div className="tooltip-time-value">
            </div>
          </div>
          <div className="tooltip-time float-right">
            <div className="tooltip-time-label">
              label
            </div>
            <div className="tooltip-time-value">
            </div>
          </div>
        </div>
      </div >
    </div>

  );

  const listView = (items = []) =>
    items.map((item, i) => (
      <div
        key={item.id}
        style={{ cursor: 'pointer' }}
      >
        {getCard(item, i)}
      </div>
    ));

  return data.length ? (
    <div className="scrollbar" id="tooltip-custom-scroll">
      <div className="force-overflow">
        {listView(data)}
      </div>
    </div>
  ) : null;
};

ChartTooltip.propTypes = {
  data: PropTypes.array.isRequired,
  onCardClick: PropTypes.func,
};

export default ChartTooltip;
