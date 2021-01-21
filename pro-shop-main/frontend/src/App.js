import React, { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { Route } from "react-router";
import Loader from "./components/Loader";

const HomePage = lazy(() => import("./screens/HomeePage"));
const ProductPage = lazy(() => import("./screens/ProductPage"));
const CartPage = lazy(() => import("./screens/CartPage"));
const LoginScreen = lazy(() => import("./screens/LoginPage"));
const ProfilePage = lazy(() => import("./screens/ProfilePage"));
const RegisterPage = lazy(() => import("./screens/RegisterPage"));
const ShippingPage = lazy(() => import("./screens/ShippingPage"));
const PaymentPage = lazy(() => import("./screens/PaymentPage"));
const PlaceOrderPage = lazy(() => import("./screens/PlaceOrder"));
const OrderPage = lazy(() => import("./screens/OrderPage"));
const UserListPage = lazy(() => import("./screens/UsersListPage"));
const UserEditPage = lazy(() => import("./screens/UserEditPage"));
const ProductListPage = lazy(() => import("./screens/ProductListPage"));
const ProductEditPage = lazy(() => import("./screens/ProductEditPage"));
const OrderListPage = lazy(() => import("./screens/OrderListPage"));

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Suspense fallback={<Loader />}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/page/:pageNumber" component={HomePage} />
            <Route exact path="/search/:keyword" component={HomePage} />
            <Route
              exact
              path="/search/:keyword/page/:pageNumber"
              component={HomePage}
            />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/admin/userlist" component={UserListPage} />
            <Route path="/admin/user/:id/edit" component={UserEditPage} />
            <Route path="/admin/product/:id/edit" component={ProductEditPage} />
            <Route
              exact
              path="/admin/productlist"
              component={ProductListPage}
            />
            <Route
              exact
              path="/admin/productlist/:pageNumber"
              component={ProductListPage}
            />
            <Route path="/admin/orderlist" component={OrderListPage} />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
