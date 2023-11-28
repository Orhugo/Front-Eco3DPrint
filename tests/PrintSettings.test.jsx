import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OnlyPrintSettings from './OnlyPrintSettings';

describe('PrintSettings', () => {
  it('renders without crashing', () => {
    render(<OnlyPrintSettings />);
    expect(screen.getByText('File details'));
  });

  it('updates title on blur', () => {
    render(<OnlyPrintSettings />);
    //const titleInput = screen.getByLabelText('Title (required)');
    const titleInput = screen.getByTestId('title');
    fireEvent.blur(titleInput, { target: { value: 'New Title' } });
    expect(screen.getByText('Title (required)'));
  });

  it('updates description on blur', () => {
    render(<OnlyPrintSettings />);
    //const descriptionInput = screen.getByLabelText('Description (required)');
    const descriptionInput = screen.getByTestId('description');
    fireEvent.blur(descriptionInput, { target: { value: 'New Description' } });
    expect(screen.getByText('Description (required)'));
  });

  it('selects a category', () => {
    render(<OnlyPrintSettings />);
    const categorySelect = screen.getByTestId('categoria');
    fireEvent.change(categorySelect, { target: { value: 'Herramientas' } });
    expect(categorySelect.value).toBe('Herramientas');
    expect(screen.getByText('Categoría'));
  });

  it('selects a brand of filament', () => {
    render(<OnlyPrintSettings />);
    const brandSelect = screen.getByLabelText('Marca del Filamento');
    fireEvent.change(brandSelect, { target: { value: 'marca1' } });
    expect(screen.getByText('Marca del Filamento'));
  });

  it('selects a color of filament', () => {
    render(<OnlyPrintSettings />);
    const colorSelect = screen.getByLabelText('Color del Filamento');
    fireEvent.change(colorSelect, { target: { value: 'color1' } });
    expect(screen.getByText('Color del Filamento'));
  });

  it('selects a material of filament', () => {
    render(<OnlyPrintSettings />);
    const materialSelect = screen.getByLabelText('Material del Filamento');
    fireEvent.change(materialSelect, { target: { value: 'material1' } });
    expect(screen.getByText('Material del Filamento'));
  });

  it('updates relleno input', () => {
    render(<OnlyPrintSettings />);
    const rellenoInput = screen.getByLabelText('Relleno');
    fireEvent.change(rellenoInput, { target: { value: '50' } });
    expect(screen.getByText('Relleno'));
  });

  it('selects a brand of printer', () => {
    render(<OnlyPrintSettings />);
    const brandPrinterSelect = screen.getByLabelText('Marca de la Impresora');
    fireEvent.change(brandPrinterSelect, { target: { value: 'marca1' } });
    expect(screen.getByText('Marca de la Impresora'));
  });

  it('selects a model of printer', () => {
    render(<OnlyPrintSettings />);
    const modelPrinterSelect = screen.getByLabelText('Modelo de la Impresora');
    fireEvent.change(modelPrinterSelect, { target: { value: 'modelo1' } });
    expect(screen.getByText('Modelo de la Impresora'));
  });

  it('selects a resolucion', () => {
    render(<OnlyPrintSettings />);
    const resolucionSelect = screen.getByTestId('resolucion');
    fireEvent.change(resolucionSelect, { target: { value: '0.2' } });
    expect(screen.getByText('Resolución'));
  });

  it('selects supports', () => {
    render(<OnlyPrintSettings />);
    const supportsYes = screen.getByLabelText('Sí');
    fireEvent.change(supportsYes, { target: { checked: true } });
    expect(screen.getByText('Soportes'));
  });

  it('selects payment', () => {
    render(<OnlyPrintSettings />);
    const paymentYes = screen.getByLabelText('Sí');
    fireEvent.change(paymentYes, { target: { checked: true } });
    expect(screen.getByText('Modelo de pago'));
  });
});
