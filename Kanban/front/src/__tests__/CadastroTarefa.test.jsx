import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CadTarefa } from '../pages/CadTarefa';
import { MemoryRouter } from 'react-router-dom';
import axios from "axios";

// Mock do axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [{ id: 1, nome: "Maria Freitas" }] })),
    post: vi.fn(),
  },
}));

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("Cadastro de Tarefa", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it("A tela do formulário é exibida com todos os campos", () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Nome do usuário/i)).toBeTruthy();
    expect(screen.getByLabelText(/Descrição/i)).toBeTruthy();
    expect(screen.getByLabelText(/Nome do setor/i)).toBeTruthy();
    expect(screen.getByLabelText(/Prioridade/i)).toBeTruthy();
    expect(screen.getByLabelText(/Status/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Cadastrar tarefa/i })).toBeTruthy();
  });

  it("deve resetar os campos após submissão bem-sucedida", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, nome: "Maria Silva" }] });
    axios.post.mockResolvedValueOnce({ data: { message: "ok" } });

    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const usuarioSelect = await screen.findByLabelText(/Nome do usuário/i);
    const descInput = screen.getByLabelText(/Descrição/i);
    const setorInput = screen.getByLabelText(/Nome do setor/i);
    const prioridadeSelect = screen.getByLabelText(/Prioridade/i);
    const statusSelect = screen.getByLabelText(/Status/i);
    const botao = screen.getByRole("button", { name: /Cadastrar tarefa/i });

    fireEvent.change(usuarioSelect, { target: { value: "1" } });
    fireEvent.change(descInput, { target: { value: "Gerar relatório financeiro" } });
    fireEvent.change(setorInput, { target: { value: "Financeiro" } });
    fireEvent.change(prioridadeSelect, { target: { value: "Alta" } });
    fireEvent.change(statusSelect, { target: { value: "A fazer" } });

    fireEvent.click(botao);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Tarefa cadastrada com sucesso");
    });

    expect(usuarioSelect.value).toBe("");
    expect(descInput.value).toBe("");
    expect(setorInput.value).toBe("");
    expect(prioridadeSelect.value).toBe("");
    expect(statusSelect.value).toBe("A fazer"); // status padrão
  });

  it("não deve permitir nome do setor com mais de 100 caracteres", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const setorInput = screen.getByLabelText(/Nome do setor/i);
    const descricaoInput = screen.getByLabelText(/Descrição/i);
    const prioridadeSelect = screen.getByLabelText(/Prioridade/i);
    const statusSelect = screen.getByLabelText(/Status/i);
    const usuarioSelect = await screen.findByLabelText(/Nome do usuário/i);
    const botaoCadastrar = screen.getByRole("button", { name: /Cadastrar tarefa/i });

    fireEvent.change(usuarioSelect, { target: { value: "1" } });
    fireEvent.input(setorInput, { target: { value: "A".repeat(101) } });
    fireEvent.input(descricaoInput, { target: { value: "Descrição válida" } });
    fireEvent.change(prioridadeSelect, { target: { value: "Media" } });
    fireEvent.change(statusSelect, { target: { value: "A fazer" } });

    fireEvent.click(botaoCadastrar);

    await waitFor(() => {
      expect(screen.getByText("Máximo 100 caracteres")).toBeInTheDocument();
    });

    expect(window.alert).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("não deve permitir caracteres que não sejam letras no nome do setor", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const setorInput = screen.getByLabelText(/Nome do setor/i);
    const descricaoInput = screen.getByLabelText(/Descrição/i);
    const prioridadeSelect = screen.getByLabelText(/Prioridade/i);
    const statusSelect = screen.getByLabelText(/Status/i);
    const usuarioSelect = await screen.findByLabelText(/Nome do usuário/i);
    const botaoCadastrar = screen.getByRole("button", { name: /Cadastrar tarefa/i });

    fireEvent.change(usuarioSelect, { target: { value: "1" } });
    fireEvent.input(setorInput, { target: { value: "TI123!" } });
    fireEvent.input(descricaoInput, { target: { value: "Descrição válida" } });
    fireEvent.change(prioridadeSelect, { target: { value: "Media" } });
    fireEvent.change(statusSelect, { target: { value: "A fazer" } });

    fireEvent.click(botaoCadastrar);

    await waitFor(() => {
      expect(screen.getByText("Digite apenas letras")).toBeInTheDocument();
    });

    expect(window.alert).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("deve mostrar erro se a descrição tiver apenas espaços ou símbolos inválidos", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const descInput = screen.getByLabelText(/Descrição/i);
    const setorInput = screen.getByLabelText(/Nome do setor/i);
    const prioridadeSelect = screen.getByLabelText(/Prioridade/i);
    const statusSelect = screen.getByLabelText(/Status/i);
    const usuarioSelect = await screen.findByLabelText(/Nome do usuário/i);
    const botaoCadastrar = screen.getByRole("button", { name: /Cadastrar tarefa/i });

    fireEvent.change(usuarioSelect, { target: { value: "1" } });

    // Apenas espaços
    fireEvent.input(descInput, { target: { value: "     " } });
    fireEvent.change(setorInput, { target: { value: "Financeiro" } });
    fireEvent.change(prioridadeSelect, { target: { value: "Media" } });
    fireEvent.change(statusSelect, { target: { value: "A fazer" } });

    fireEvent.click(botaoCadastrar);

    await waitFor(() => {
      expect(screen.getByText("Insira ao menos uma frase")).toBeInTheDocument();
    });

    // Apenas caracteres especiais
    fireEvent.input(descInput, { target: { value: "!@#$%" } });
    fireEvent.click(botaoCadastrar);

    await waitFor(() => {
      expect(screen.getByText("Descrição inválida: use letras ou números")).toBeInTheDocument();
    });

    expect(window.alert).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("não deve permitir envio sem selecionar usuário", async () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const botaoCadastrar = screen.getByRole("button", { name: /Cadastrar tarefa/i });
    fireEvent.click(botaoCadastrar);

    await waitFor(() => {
      expect(screen.getByText(/Escolha um usuário/i)).toBeInTheDocument();
    });

    expect(window.alert).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("exibe alerta quando ocorre erro no envio da tarefa", async () => {
    axios.post.mockRejectedValueOnce(new Error("Erro de rede"));

    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const usuarioSelect = await screen.findByLabelText(/Nome do usuário/i);
    const descInput = screen.getByLabelText(/Descrição/i);
    const setorInput = screen.getByLabelText(/Nome do setor/i);
    const prioridadeSelect = screen.getByLabelText(/Prioridade/i);
    const statusSelect = screen.getByLabelText(/Status/i);
    const botaoCadastrar = screen.getByRole("button", { name: /Cadastrar tarefa/i });

    fireEvent.change(usuarioSelect, { target: { value: "1" } });
    fireEvent.change(descInput, { target: { value: "Descrição válida" } });
    fireEvent.change(setorInput, { target: { value: "Financeiro" } });
    fireEvent.change(prioridadeSelect, { target: { value: "Media" } });
    fireEvent.change(statusSelect, { target: { value: "A fazer" } });

    fireEvent.click(botaoCadastrar);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Erro no cadastro da tarefa. Verifique as informações");
    });
  });

  it("não quebra se falhar ao buscar usuários", async () => {
    axios.get.mockRejectedValueOnce(new Error("Erro ao buscar usuários"));

    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    expect(await screen.findByLabelText(/Nome do usuário/i)).toBeInTheDocument();
  });

  it("deve permitir envio válido e mostrar alerta de sucesso", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const usuarioSelect = await screen.findByLabelText(/Nome do usuário/i);
    const descInput = screen.getByLabelText(/Descrição/i);
    const setorInput = screen.getByLabelText(/Nome do setor/i);
    const prioridadeSelect = screen.getByLabelText(/Prioridade/i);
    const statusSelect = screen.getByLabelText(/Status/i);
    const botaoCadastrar = screen.getByRole("button", { name: /Cadastrar tarefa/i });

    fireEvent.change(usuarioSelect, { target: { value: "1" } });
    fireEvent.change(descInput, { target: { value: "Tarefa válida" } });
    fireEvent.change(setorInput, { target: { value: "Financeiro" } });
    fireEvent.change(prioridadeSelect, { target: { value: "Media" } });
    fireEvent.change(statusSelect, { target: { value: "A fazer" } });

    fireEvent.click(botaoCadastrar);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Tarefa cadastrada com sucesso");
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  it("deve ter status padrão 'A fazer' ao carregar o formulário", () => {
    render(
      <MemoryRouter>
        <CadTarefa />
      </MemoryRouter>
    );

    const statusSelect = screen.getByLabelText(/Status/i);
    expect(statusSelect.value).toBe("A fazer");
  });
});
