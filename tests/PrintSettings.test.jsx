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
    expect(titleInput.value).toBe('New Title');
  });

  it('updates description on blur', () => {
    render(<OnlyPrintSettings />);
    //const descriptionInput = screen.getByLabelText('Description (required)');
    const descriptionInput = screen.getByTestId('description');
    fireEvent.blur(descriptionInput, { target: { value: 'New Description' } });
    expect(screen.getByText('Description (required)'));
    expect(descriptionInput.value).toBe('New Description');
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
    const brandSelect = screen.getByTestId('marcaFilamento');
    fireEvent.change(brandSelect, { target: { value: 'marca1' } });
    expect(screen.getByText('Marca del Filamento'));
    expect(brandSelect.value).toBe('marca1');
  });

  it('selects a color of filament', () => {
    render(<OnlyPrintSettings />);
    const colorSelect = screen.getByTestId('colorFilamento');
    fireEvent.change(colorSelect, { target: { value: 'color1' } });
    expect(screen.getByText('Color del Filamento'));
    expect(colorSelect.value).toBe('color1');
  });

  it('selects a material of filament', () => {
    render(<OnlyPrintSettings />);
    const materialSelect = screen.getByTestId('materialFilamento');
    fireEvent.change(materialSelect, { target: { value: 'material1' } });
    expect(screen.getByText('Material del Filamento'));
    expect(materialSelect.value).toBe('material1');
  });

  it('updates relleno input', () => {
    render(<OnlyPrintSettings />);
    const rellenoInput = screen.getByTestId('relleno');
    fireEvent.change(rellenoInput, { target: { value: '50' } });
    expect(screen.getByText('Relleno'));
    expect(rellenoInput.value).toBe('50');
  });

  it('selects a brand of printer', () => {
    render(<OnlyPrintSettings />);
    const brandPrinterSelect = screen.getByTestId('marcaImpresora');
    fireEvent.change(brandPrinterSelect, { target: { value: 'marca1' } });
    expect(screen.getByText('Marca de la Impresora'));
    expect(brandPrinterSelect.value).toBe('marca1');
  });

  it('selects a model of printer', () => {
    render(<OnlyPrintSettings />);
    const modelPrinterSelect = screen.getByTestId('modeloImpresora');
    fireEvent.change(modelPrinterSelect, { target: { value: 'modelo1' } });
    expect(screen.getByText('Modelo de la Impresora'));
    expect(modelPrinterSelect.value).toBe('modelo1');
  });

  it('selects a resolucion', () => {
    render(<OnlyPrintSettings />);
    const resolucionSelect = screen.getByTestId('resolucion');
    fireEvent.change(resolucionSelect, { target: { value: '0.2' } });
    expect(screen.getByText('Resolución'));
    expect(resolucionSelect.value).toBe('0.2');
  });

  it('selects supports', () => {
    render(<OnlyPrintSettings />);
    const supportsYes = screen.getByTestId('soportes');
    fireEvent.change(supportsYes, { target: { checked: true } });
    expect(screen.getByText('Soportes'));
    expect(supportsYes.checked).toBe(true);
  });

  it('selects payment', () => {
    render(<OnlyPrintSettings />);
    const paymentYes = screen.getByTestId('pago');
    fireEvent.change(paymentYes, { target: { checked: true } });
    expect(screen.getByText('Modelo de pago'));
    expect(paymentYes.checked).toBe(true);
  });
});
