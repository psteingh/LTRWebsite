import Carousel from "react-bootstrap/Carousel";

function CarouselBS() {
  return (
<Carousel>
  <Carousel.Item interval={3000}>
    <Carousel.Caption>When did I tell them a Lie?</Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={3000}>
    <Carousel.Caption>Did I tell them a Lie?</Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={3000}>
    <Carousel.Caption>What Lie did I tell them?</Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={3000}>
    <Carousel.Caption>Why did I tell them a Lie?</Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}
export default CarouselBS;