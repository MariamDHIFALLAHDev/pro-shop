import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../redux/product/actions";
import { productsListSelector } from "../redux/product/productSelectors";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const { products, isLoading, error, pages, page } = useSelector(
    productsListSelector
  );

  useEffect(() => {
    dispatch(getProductsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      <Row>
        {isLoading && <Loader>Loading...</Loader>}
        {error && (
          <Message variant="danger">Something went wrong {error}</Message>
        )}
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
    </>
  );
};

export default HomePage;
