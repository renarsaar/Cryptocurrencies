import React from 'react';
import Chart from 'react-apexcharts';

// Return the time elapsed
function timeSince(date) {
  const parsedData = Date.parse(date);
  const seconds = Math.floor(new Date() - parsedData) / 1000;
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval === 1 ? '1 year ago' : `${interval} years ago`}`;
  }
  interval = Math.floor(seconds / 2592000);

  if (interval >= 1) {
    return `${interval === 1 ? '1 month ago' : `${interval} months ago`}`;
  }
  interval = Math.floor(seconds / 86400);

  if (interval >= 1) {
    return `${interval === 1 ? '1 day ago' : `${interval} days ago`}`;
  }
  interval = Math.floor(seconds / 3600);

  if (interval >= 1) {
    return `${interval === 1 ? '1 hour ago' : `${interval} hours ago`}`;
  }
  interval = Math.floor(seconds / 60);

  if (interval >= 1) {
    return `${interval === 1 ? '1 minute ago' : `${interval} minutes ago`}`;
  }

  return 'Just now';
}

// Format Price with Commas
function numberWithCommas(num) {
  return Number.parseFloat(num)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function ApexChart({ data, interval, theme }) {
  if (data[interval] === undefined) {
    return (
      <>
        <div className="placeholder" />
        <div className="placeholder" />
      </>
    );
  }

  return (
    <div
      style={{
        background: theme.foreground,
        color: theme.textcolor,
        boxShadow: theme.boxshadow,
      }}
      className="chart"
    >
      <div className="single">
        <div className="item">
          <div className="name">
            <div className="currency">
              <img src={data.logo_url} alt={data.id} />
              {data.name}
              <span>
                (
                {data.id}
                )
              </span>
            </div>
            <span className="rank">
              Rank:
              {' '}
              {data.rank}
            </span>
          </div>

          <div className="prices">
            <div>
              Price:
              {' '}
              <span className="highlight">{`${numberWithCommas(data.price)} €. `}</span>
              <div
                className="tooltip"
                style={{
                  color: theme.bordercolor,
                  background: theme.foreground,
                }}
              >
                <i className="fas fa-info-circle" />
                <div
                  className="tooltiptext"
                  style={{
                    color: theme.foreground,
                    background: theme.bordercolor,
                  }}
                >
                  Updated
                  {' '}
                  <span>
                    {timeSince(data.price_timestamp)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              Market Cap:
              {' '}
              <span className="highlight">
                {`${numberWithCommas(data.price)} €. `}
              </span>
            </div>

            <div>
              Circluating Supply:
              {' '}
              <span className="highlight">
                {`${data.circulating_supply} pcs.`}
              </span>
            </div>

            <div>
              Highest price recorded
              {' '}
              <span className="highlight">
                {`${numberWithCommas(data.price)} €. `}
              </span>
              {' '}
              {timeSince(data.high_timestamp)}
            </div>
          </div>
        </div>
      </div>
      <Chart
        type="line"
        className="line"
        width={400}
        height={300}
        series={[{
          name: data.name,
          data: [data.price - data[interval].price_change, data.price - data[interval].price_change, data.price],
        }]}
        options={{
          chart: {
            height: 350,
            type: 'line',
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            theme: theme.type === 'light' ? 'light' : 'dark',
            x: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
            colors: data[interval].price_change >= 0 ? '#1AC40E' : '#C40E0E',
          },
          title: {
            text: `${data.name} price change.`,
            align: 'center',
            style: {
              color: theme.textcolor,
            },
          },
          grid: {
            row: {
              colors: [theme.foreground, theme.background],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: ['Before', '', 'After'],
            labels: {
              style: {
                colors: theme.textcolor,
              },
            },
            tooltip: {
              enabled: false,
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: theme.textcolor,
              },
              formatter(val) {
                if (val >= 1000) return val.toFixed(2);
                if (val >= 100) return val.toFixed(3);
                if (val >= 10) return val.toFixed(4);
                if (val <= 0) return val;
                return val;
              },
            },
          },
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </div>
  );
}
