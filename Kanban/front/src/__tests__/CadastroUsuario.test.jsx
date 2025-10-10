import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CadUsuario } from "../pages/CadUsuario";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

// Mock do axios para evitar requisições reais
vi.mock("axios");

describe("CadUsuario", () => {

  beforeEach(() => {
    window.alert = vi.fn(); // evita alertas reais
    vi.clearAllMocks(); // limpa mocks entre testes
  });

  // ******************* RENDERIZAÇÃO *******************
  it("deve renderizar todos os campos do formulário", () => {
    render(<CadUsuario />);

    const nomeInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const botao = screen.getByRole("button", { name: /Cadastrar/i });

    expect(nomeInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(botao).toBeTruthy();
  });

  // ******************* VALIDAÇÃO DE CAMPOS VAZIOS *******************
  it("deve mostrar erros quando campos estiverem vazios", async () => {
    render(<CadUsuario />);
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Insira ao menos 1 caractere/i)).toBeTruthy();
      expect(screen.getByText(/Insira seu email/i)).toBeTruthy();
    });
  });

  it("deve mostrar erro para email inválido", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "emailinvalido" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Formato de email inválido/i)).toBeTruthy();
    });
  });

  // ******************* SUBMISSÃO E RESET *******************
  it("deve resetar os campos após submissão bem-sucedida", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "ok" } });
    render(<CadUsuario />);

    const nomeInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const botao = screen.getByRole("button", { name: /Cadastrar/i });

    fireEvent.input(nomeInput, { target: { value: "Maria Silva" } });
    fireEvent.input(emailInput, { target: { value: "maria@email.com" } });

    fireEvent.click(botao);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Usuário cadastrado com sucesso");
      expect(nomeInput.value).toBe("");
      expect(emailInput.value).toBe("");
    });
  });

  it("mostra alerta se houver erro na submissão", async () => {
    axios.post.mockRejectedValueOnce(new Error("Erro de rede"));

    render(<CadUsuario />);

    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Tente novamente, por favor");
    });
  });

  // ******************* VALIDAÇÃO NOME *******************
  it("deve mostrar erro se o nome tiver apenas um nome", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Digite nome completo/i)).toBeTruthy();
    });
  });

  it("não deve aceitar nome com apenas espaços", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "    " } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Insira ao menos 1 caractere/i)).toBeTruthy();
    });
  });

  it("não deve aceitar nome com caracteres especiais ou números", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria@123" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Digite nome completo/i)).toBeTruthy();
    });
  });

  it("aceita nome completo válido", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Digite nome completo/i)).toBeNull();
    });
  });

  it("aceita nome com múltiplos espaços entre palavras", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria   Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Digite nome completo/i)).toBeNull();
    });
  });

  it("não permite nome com espaços no início ou fim", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "  Maria Silva  " } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(window.alert).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  it("não permite nome com mais de 100 caracteres", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "A".repeat(101) } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "teste@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Digite nome completo/i)
      ).toBeTruthy();
      expect(window.alert).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  // ******************* VALIDAÇÃO EMAIL *******************
  it("aceita email válido", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "maria@email.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Formato de email inválido/i)).toBeNull();
      expect(screen.queryByText(/Insira seu email/i)).toBeNull();
    });
  });

  it("não aceita email com mais de 255 caracteres", async () => {
    render(<CadUsuario />);
    const longEmail = "a".repeat(256) + "@gmail.com";
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: longEmail } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Formato de email inválido/i)).toBeTruthy();
    });
  });

  it("não permite email com apenas espaços ou caracteres especiais", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "!@#$%^&*" } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Formato de email inválido/i)).toBeTruthy();
      expect(window.alert).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  it("não permite email com espaços no início ou fim", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria Silva" } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: "   maria@email.com  " } });
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(window.alert).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

});
