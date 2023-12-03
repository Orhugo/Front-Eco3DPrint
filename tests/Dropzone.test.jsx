import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import Dropzone from "./OnlyDropzone";

test("renders Dropzone component", () => {
  render(<Dropzone />);
});

test("handles file drop correctly", () => {
  const { container, getByText } = render(<Dropzone />);

  // Busca el elemento utilizando el atributo data-testid
  const dropzoneElement = container.querySelector('[data-testid="dropzone"]');

  // Simula la acción de soltar archivos
  fireEvent.drop(dropzoneElement, {
    dataTransfer: {
      files: [
        new File(["file content"], "../public/face.stl", { type: "model/stl" }),
      ],
    },
  });

  // Agrega más aserciones según sea necesario, por ejemplo:
  expect(screen.getByText("Accepted Files"));
  expect(screen.getByText("Rejected Files"));
});

test("removes a file correctly", async () => {
  const { container, getByText, queryByLabelText } = render(<Dropzone />);

  const dropzoneElement = container.querySelector('[data-testid="dropzone"]');
  const remove = container.querySelector('[data-testid="removeAll"]');

  // Simula la acción de soltar archivos
  fireEvent.drop(dropzoneElement, {
    dataTransfer: {
      files: [
        new File(["file content"], "../public/Face.stl", { type: "model/stl" }),
      ],
    },
  });

  // Verifica que el archivo esté presente antes de la eliminación
  expect(screen.findByLabelText("Face.stl"));

  // Simula la acción de eliminar un archivo
  fireEvent.click(remove);

  // Verifica que el archivo se haya eliminado
  expect(queryByLabelText('Face.stl')).toBeNull();
});
