'use client'
import React, { createContext, useContext } from 'react';
import axios from 'axios';

const  FormataValorContext = createContext(null);

export const FormataValorProvider = ({ children }) => {
    const formatarValor = (valor) => {
     if (valor === "" || valor === null || valor === undefined) return "";
     // Aceita número ou string numérica
     const numero = typeof valor === "number" ? valor : parseFloat(valor.toString().replace(",", "."));
     if (isNaN(numero)) return "";
     return numero.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
     });

  };

  const desformatarValor = (valor) => {
          if (!valor) return 0;
          // Remove "R$", espaços e pontos, troca vírgula por ponto
          //só quero que retire a virgula

          return parseFloat(
          valor
               .toString()
               .replace("R$", "")
               .replace(/\s/g, "")
               .replace(/\./g, "")
               .replace(",", "")
          );
     }

  return (
    <FormataValorContext.Provider value={{ formatarValor, desformatarValor }}>
      {children}
    </FormataValorContext.Provider>
  );
};

export const useFormataValor = () => useContext(FormataValorContext);