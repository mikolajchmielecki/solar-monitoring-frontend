import ReactApexChart from "react-apexcharts"
import { Container, Card } from "react-bootstrap"

export default function (props) {

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    },
    yaxis: {
      title: {
        text: 'kWh'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " kWh"
        }
      }
    }
  }

  const series = [{
    name: 'Energia wyprodukowana',
    data: [null, 55, 57, 56, 61, 58, 63, 60, 66, 63, 60, 66]
  }, {
    name: 'Energia wprowadzona do sieci',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 63, 60, 66]
  }, {
    name: 'Energia pobrana z sieci',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 63, 60, 66]
  }, {
    name: 'Energia zurzyta bezpośrednio',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 63, 60, 66]
  }]

    return (
      <Container fluid="lg">
        <Card >
        <Card.Header>Pomiary historyczne</Card.Header>
          <Card.Body>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
          </Card.Body>
        </Card>
      </Container>
    )}
