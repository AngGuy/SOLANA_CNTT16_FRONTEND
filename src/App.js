import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Navbar,
  Nav,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [points, setPoints] = useState(0);
  const [discountCode, setDiscountCode] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/product");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  const buyProduct = async (productId) => {
    const res = await axios.post("/api/product/buy", {
      walletAddress,
      productId,
    });
    alert(`Mua thành công, NFT: ${res.data.nftAddress}`);
    setPoints(points + 10); // Thêm điểm cho người dùng sau khi mua
  };

  const redeemPoints = async () => {
    const res = await axios.post("/api/reward/redeem", { walletAddress });
    setDiscountCode(res.data.discountCode);
    setPoints(res.data.pointsLeft);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Faster</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {walletAddress ? (
                <Nav.Link disabled className="text-light">
                  Ví của bạn: {walletAddress}
                </Nav.Link>
              ) : (
                <Button variant="outline-light" onClick={connectWallet}>
                  Kết nối ví Phantom
                </Button>
              )}
              <Nav.Link className="text-light">
                <Badge pill bg="success">
                  Điểm: {points}
                </Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container>
        <h1 className="text-center mb-4">Các tài khoản game</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => buyProduct(product._id)}
                    className="mt-auto"
                  >
                    Mua với giá ${product.price}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Redeem Points Section */}
        <div className="text-center mt-5">
          <h3>Điểm của bạn: {points}</h3>
          <Button
            onClick={redeemPoints}
            disabled={points < 100}
            variant={points >= 100 ? "success" : "secondary"}
            className="mt-2"
          >
            Đổi mã giảm giá
          </Button>
          {discountCode && (
            <Alert variant="success" className="mt-3">
              Mã giảm giá của bạn: <strong>{discountCode}</strong>
            </Alert>
          )}
        </div>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <Container>
          <p className="mb-0">&copy; 2024 by Faster.</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
