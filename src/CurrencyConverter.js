import React, { useState } from "react";
import {
  Jumbotron,
  Button,
  Form,
  Col,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import ListCurrencies from "./components/ListCurrencies";
// import api from "./services/api";

import "./CurrencyConverter.css";

function CurrencyConverter() {
  const [value, setValue] = useState("1");
  const [currencyOrigin, setCurrencyOrigin] = useState("BRL");
  const [conversionCurrency, setConversionCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resultConversion, setResultConversion] = useState("");
  const [showMessageError, setShowMessageError] = useState(false);

  function conversion(e) {
    e.preventDefault();
    setValidated(true);

    if (e.currentTarget.checkValidity() === true) {
      setLoading(true);
      axios
        .get(
          "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3"
        )
        .then((res) => {
          const quotation = getQuotation(res.data);

          if (quotation) {
            setResultConversion(
              `${value} ${currencyOrigin} = ${quotation} ${conversionCurrency}`
            );
            setShowModal(true);
            setLoading(false);
            setShowMessageError(false);
          } else {
            showError();
          }
        })
        .catch((err) => showError());
    }
  }

  function getQuotation(dataQuotation) {
    if (!dataQuotation || dataQuotation.success !== true) {
      return false;
    }

    const quotationOrigin = dataQuotation.rates[currencyOrigin];
    const conversionQuotation = dataQuotation.rates[conversionCurrency];
    const quotation = (1 / quotationOrigin) * conversionQuotation * value;
    return quotation.toFixed(2);
  }

  function handleCloseModal(e) {
    setValue("1");
    setCurrencyOrigin("BRL");
    setConversionCurrency("USD");
    setValidated(false);
    setShowModal(false);
  }

  function showError() {
    setShowMessageError(true);
    setLoading(false);
  }

  return (
    <>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={showMessageError}>
        Erro para obter os dados de conversão, por favor, tente novamente.
      </Alert>
      <Jumbotron>
        <Form onSubmit={conversion} noValidate validated={validated}>
          <Form.Row>
            <Col sm="3">
              <Form.Control
                placeholder="0"
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
                required
              />
            </Col>

            <Col sm="3">
              <Form.Control
                as="select"
                value={currencyOrigin}
                onChange={(e) => setCurrencyOrigin(e.target.value)}
              >
                <ListCurrencies />
              </Form.Control>
            </Col>

            <Col sm="1" className="text-center" style={{ paddingTop: "5px" }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>

            <Col sm="3">
              <Form.Control
                as="select"
                value={conversionCurrency}
                onChange={(e) => setConversionCurrency(e.target.value)}
              >
                <ListCurrencies />
              </Form.Control>
            </Col>

            <Col sm="2">
              <Button
                variant="success"
                type="submit"
                data-testid="btn-converter"
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Converter"
                )}
              </Button>
            </Col>
          </Form.Row>
        </Form>

        <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>{resultConversion}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
              Nova conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </>
  );
}

export default CurrencyConverter;
