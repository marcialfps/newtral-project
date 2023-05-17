import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "whatwg-fetch";
import Home from "../app/page";
import { politiciansErrorReponseMock, politiciansReponseMock } from "./mocks";

//Debemos crear la variable de entorno para que no llegue como undefined
process.env.NEXT_PUBLIC_API_URL = "localhost:3000";

//Mockeamos la API, indicando la respuesta a la peticion
const server = setupServer(
  rest.get("http://localhost:3000/politicians", (req, res, ctx) => {
    return res(ctx.json(politiciansReponseMock));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Loads data into the table", async () => {
  render(<Home />);

  //Comprobamos que está el titulo y los campos de busqueda
  expect(screen.getByText("Inicio")).toBeTruthy();
  expect(screen.getAllByRole("textbox").length).toBe(3);

  //Esperamos a que el indicador de carga desaparezca
  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

  //Comprobamos que se muestra en pantalla el primer politico que devuelve la API
  await screen.findByText("Josep Manel Francés i Reig");
});

test("Shows error message", async () => {
  //Modificamos el handler con otra respueta
  server.use(
    rest.get("http://localhost:3000/politicians", (req, res, ctx) => {
      return res(ctx.status(500), ctx.json(politiciansErrorReponseMock));
    })
  );

  render(<Home />);

  //Comprobamos que está el titulo y los campos de busqueda
  expect(screen.getByText("Inicio")).toBeTruthy();
  expect(screen.getAllByRole("textbox").length).toBe(3);

  //Esperamos a que el indicador de carga desaparezca
  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

  //Comprobamos que se muestra el mensaje de error
  await screen.findByText("Internal error");
});
