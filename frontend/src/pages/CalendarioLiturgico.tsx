import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function CalendarioLiturgico() {
  const [mesesExpandidos, setMesesExpandidos] = useState<number[]>([]);

  const alternarMes = (index: number) => {
    setMesesExpandidos(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const calendarioMeses = [
    {
      nome: "Janeiro",
      tempo: "Tempo do Natal / Tempo Comum",
      corTempo: "from-blue-600 to-blue-800",
      dias: [
        { dia: 1, diaSemana: "Quinta-Feira", evento: "Santa Maria, Mãe de Deus", tipo: "S", semana: "I" },
        { dia: 2, diaSemana: "Sexta-Feira", evento: "Santos Basílio Magno e Gregório de Nazianzo, bispos e doutores da Igreja", tipo: "M", semana: "" },
        { dia: 3, diaSemana: "Sábado", evento: "Santíssimo Nome de Jesus", tipo: "m", semana: "" },
        { dia: 4, diaSemana: "Domingo", evento: "Domingo II do Natal", tipo: "", semana: "II" },
        { dia: 5, diaSemana: "Segunda-Feira", evento: "Segunda-Feira do Tempo do Natal", tipo: "", semana: "" },
        { dia: 6, diaSemana: "Terça-Feira", evento: "Epifania do Senhor", tipo: "S", semana: "" },
        { dia: 7, diaSemana: "Quarta-Feira", evento: "São Raimundo de Peñafort, presbítero", tipo: "m", semana: "" },
        { dia: 8, diaSemana: "Quinta-Feira", evento: "Quinta-Feira depois da Epifania", tipo: "", semana: "" },
        { dia: 9, diaSemana: "Sexta-Feira", evento: "Sexta-Feira depois da Epifania", tipo: "", semana: "" },
        { dia: 10, diaSemana: "Sábado", evento: "Sábado depois da Epifania", tipo: "", semana: "" },
        { dia: 11, diaSemana: "Domingo", evento: "Batismo do Senhor", tipo: "F", semana: "III" },
        { dia: 12, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana I do Tempo Comum", tipo: "", semana: "I", tempo: "Tempo Comum" },
        { dia: 13, diaSemana: "Terça-Feira", evento: "Santo Hilário, bispo e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 14, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana I do Tempo Comum", tipo: "", semana: "" },
        { dia: 15, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana I do Tempo Comum", tipo: "", semana: "" },
        { dia: 16, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana I do Tempo Comum", tipo: "", semana: "" },
        { dia: 17, diaSemana: "Sábado", evento: "Santo Antão, abade", tipo: "M", semana: "" },
        { dia: 18, diaSemana: "Domingo", evento: "Domingo II do Tempo Comum", tipo: "", semana: "II" },
        { dia: 19, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana II do Tempo Comum", tipo: "", semana: "" },
        { dia: 20, diaSemana: "Terça-Feira", evento: "São Fabião, papa e mártir / São Sebastião, mártir", tipo: "m", semana: "" },
        { dia: 21, diaSemana: "Quarta-Feira", evento: "Santa Inês, virgem e mártir", tipo: "M", semana: "" },
        { dia: 22, diaSemana: "Quinta-Feira", evento: "São Vicente, diácono e mártir", tipo: "m", semana: "" },
        { dia: 23, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana II do Tempo Comum", tipo: "", semana: "" },
        { dia: 24, diaSemana: "Sábado", evento: "São Francisco de Sales, bispo e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 25, diaSemana: "Domingo", evento: "Domingo III do Tempo Comum", tipo: "", semana: "III" },
        { dia: 26, diaSemana: "Segunda-Feira", evento: "Santos Timóteo e Tito, bispos", tipo: "M", semana: "" },
        { dia: 27, diaSemana: "Terça-Feira", evento: "Santa Ângela Merici, virgem", tipo: "m", semana: "" },
        { dia: 28, diaSemana: "Quarta-Feira", evento: "São Tomás de Aquino, presbítero e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 29, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana III do Tempo Comum", tipo: "", semana: "" },
        { dia: 30, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana III do Tempo Comum", tipo: "", semana: "" },
        { dia: 31, diaSemana: "Sábado", evento: "São João Bosco, presbítero", tipo: "M", semana: "" },
      ]
    },
    {
      nome: "Fevereiro",
      tempo: "Tempo Comum / Quaresma",
      corTempo: "from-green-600 via-green-500 to-purple-600",
      dias: [
        { dia: 1, diaSemana: "Domingo", evento: "Domingo IV do Tempo Comum", tipo: "", semana: "IV", tempo: "Tempo Comum" },
        { dia: 2, diaSemana: "Segunda-Feira", evento: "Apresentação do Senhor", tipo: "F", semana: "" },
        { dia: 3, diaSemana: "Terça-Feira", evento: "Santo Anscário, bispo / São Brás, bispo e mártir", tipo: "m", semana: "" },
        { dia: 4, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana IV do Tempo Comum", tipo: "", semana: "" },
        { dia: 5, diaSemana: "Quinta-Feira", evento: "Santa Águeda, virgem e mártir", tipo: "M", semana: "" },
        { dia: 6, diaSemana: "Sexta-Feira", evento: "Santos Paulo Miki e Companheiros, mártires", tipo: "M", semana: "" },
        { dia: 7, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 8, diaSemana: "Domingo", evento: "Domingo V do Tempo Comum", tipo: "", semana: "I" },
        { dia: 9, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana V do Tempo Comum", tipo: "", semana: "" },
        { dia: 10, diaSemana: "Terça-Feira", evento: "Santa Escolástica, virgem", tipo: "M", semana: "" },
        { dia: 11, diaSemana: "Quarta-Feira", evento: "Nossa Senhora de Lurdes", tipo: "m", semana: "" },
        { dia: 12, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana V do Tempo Comum", tipo: "", semana: "" },
        { dia: 13, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana V do Tempo Comum", tipo: "", semana: "" },
        { dia: 14, diaSemana: "Sábado", evento: "Santos Cirilo, monge, e Metódio, bispo", tipo: "M", semana: "" },
        { dia: 15, diaSemana: "Domingo", evento: "Domingo VI do Tempo Comum", tipo: "", semana: "II" },
        { dia: 16, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana VI do Tempo Comum", tipo: "", semana: "" },
        { dia: 17, diaSemana: "Terça-Feira", evento: "Santos Sete Fundadores da Ordem dos Servitas", tipo: "m", semana: "" },
        { dia: 18, diaSemana: "Quarta-Feira", evento: "Quarta-feira de Cinzas", tipo: "", semana: "IV", tempo: "Quaresma" },
        { dia: 19, diaSemana: "Quinta-Feira", evento: "Quinta-Feira depois das Cinzas", tipo: "", semana: "" },
        { dia: 20, diaSemana: "Sexta-Feira", evento: "Sexta-Feira depois das Cinzas", tipo: "", semana: "" },
        { dia: 21, diaSemana: "Sábado", evento: "São Pedro Damião, bispo e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 22, diaSemana: "Domingo", evento: "Domingo I da Quaresma", tipo: "", semana: "I" },
        { dia: 23, diaSemana: "Segunda-Feira", evento: "São Policarpo, bispo e mártir", tipo: "m", semana: "" },
        { dia: 24, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana I da Quaresma", tipo: "", semana: "" },
        { dia: 25, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana I da Quaresma", tipo: "", semana: "" },
        { dia: 26, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana I da Quaresma", tipo: "", semana: "" },
        { dia: 27, diaSemana: "Sexta-Feira", evento: "São Gregório de Narek, abade e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 28, diaSemana: "Sábado", evento: "Sábado da Semana I da Quaresma", tipo: "", semana: "" },
      ]
    },
    {
      nome: "Março",
      tempo: "Quaresma",
      corTempo: "from-purple-600 to-purple-800",
      dias: [
        { dia: 1, diaSemana: "Domingo", evento: "Domingo II da Quaresma", tipo: "", semana: "II", tempo: "Quaresma" },
        { dia: 2, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana II da Quaresma", tipo: "", semana: "" },
        { dia: 3, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana II da Quaresma", tipo: "", semana: "" },
        { dia: 4, diaSemana: "Quarta-Feira", evento: "São Casimiro", tipo: "m", semana: "" },
        { dia: 5, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana II da Quaresma", tipo: "", semana: "" },
        { dia: 6, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana II da Quaresma", tipo: "", semana: "" },
        { dia: 7, diaSemana: "Sábado", evento: "Santas Perpétua e Felicidade, mártires", tipo: "m", semana: "" },
        { dia: 8, diaSemana: "Domingo", evento: "Domingo III da Quaresma", tipo: "", semana: "III" },
        { dia: 9, diaSemana: "Segunda-Feira", evento: "Santa Francisca Romana, religiosa", tipo: "m", semana: "" },
        { dia: 10, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana III da Quaresma", tipo: "", semana: "" },
        { dia: 11, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana III da Quaresma", tipo: "", semana: "" },
        { dia: 12, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana III da Quaresma", tipo: "", semana: "" },
        { dia: 13, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana III da Quaresma", tipo: "", semana: "" },
        { dia: 14, diaSemana: "Sábado", evento: "Sábado da Semana III da Quaresma", tipo: "", semana: "" },
        { dia: 15, diaSemana: "Domingo", evento: "Domingo IV da Quaresma", tipo: "", semana: "IV" },
        { dia: 16, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana IV da Quaresma", tipo: "", semana: "" },
        { dia: 17, diaSemana: "Terça-Feira", evento: "São Patrício, bispo", tipo: "m", semana: "" },
        { dia: 18, diaSemana: "Quarta-Feira", evento: "São Cirilo de Jerusalém, bispo e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 19, diaSemana: "Quinta-Feira", evento: "São José, esposo da Virgem Santa Maria", tipo: "S", semana: "" },
        { dia: 20, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana IV da Quaresma", tipo: "", semana: "" },
        { dia: 21, diaSemana: "Sábado", evento: "Sábado da Semana IV da Quaresma", tipo: "", semana: "" },
        { dia: 22, diaSemana: "Domingo", evento: "Domingo V da Quaresma", tipo: "", semana: "I" },
        { dia: 23, diaSemana: "Segunda-Feira", evento: "São Turíbio de Mongrovejo, bispo", tipo: "m", semana: "" },
        { dia: 24, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana V da Quaresma", tipo: "", semana: "" },
        { dia: 25, diaSemana: "Quarta-Feira", evento: "Anunciação do Senhor", tipo: "S", semana: "" },
        { dia: 26, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana V da Quaresma", tipo: "", semana: "" },
        { dia: 27, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana V da Quaresma", tipo: "", semana: "" },
        { dia: 28, diaSemana: "Sábado", evento: "Sábado da Semana V da Quaresma", tipo: "", semana: "" },
        { dia: 29, diaSemana: "Domingo", evento: "Domingo de Ramos e da Paixão do Senhor", tipo: "", semana: "II" },
        { dia: 30, diaSemana: "Segunda-Feira", evento: "Segunda-feira da Semana Santa", tipo: "", semana: "" },
        { dia: 31, diaSemana: "Terça-Feira", evento: "Terça-feira da Semana Santa", tipo: "", semana: "" },
      ]
    },
    {
      nome: "Abril",
      tempo: "Tríduo Pascal / Tempo Pascal",
      corTempo: "from-red-600 to-red-800",
      dias: [
        { dia: 1, diaSemana: "Quarta-Feira", evento: "Quarta-feira da Semana Santa", tipo: "", semana: "II", tempo: "Semana Santa" },
        { dia: 2, diaSemana: "Quinta-Feira", evento: "Quinta-feira da Ceia do Senhor", tipo: "", semana: "II", tempo: "Tríduo Pascal" },
        { dia: 3, diaSemana: "Sexta-Feira", evento: "Sexta-feira da Paixão do Senhor", tipo: "", semana: "" },
        { dia: 4, diaSemana: "Sábado", evento: "Sábado Santo", tipo: "", semana: "" },
        { dia: 5, diaSemana: "Domingo", evento: "Domingo de Páscoa da Ressurreição do Senhor", tipo: "", semana: "I", tempo: "Tempo Pascal" },
        { dia: 6, diaSemana: "Segunda-Feira", evento: "Segunda-Feira na Oitava da Páscoa", tipo: "S", semana: "" },
        { dia: 7, diaSemana: "Terça-Feira", evento: "Terça-Feira na Oitava da Páscoa", tipo: "S", semana: "" },
        { dia: 8, diaSemana: "Quarta-Feira", evento: "Quarta-Feira na Oitava da Páscoa", tipo: "S", semana: "" },
        { dia: 9, diaSemana: "Quinta-Feira", evento: "Quinta-Feira na Oitava da Páscoa", tipo: "S", semana: "" },
        { dia: 10, diaSemana: "Sexta-Feira", evento: "Sexta-Feira na Oitava da Páscoa", tipo: "S", semana: "" },
        { dia: 11, diaSemana: "Sábado", evento: "Sábado na Oitava da Páscoa", tipo: "S", semana: "" },
        { dia: 12, diaSemana: "Domingo", evento: "Domingo II da Páscoa ou da Divina Misericórdia", tipo: "", semana: "" },
        { dia: 13, diaSemana: "Segunda-Feira", evento: "São Martinho I, papa e mártir", tipo: "m", semana: "II" },
        { dia: 14, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana II da Páscoa", tipo: "", semana: "" },
        { dia: 15, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana II da Páscoa", tipo: "", semana: "" },
        { dia: 16, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana II da Páscoa", tipo: "", semana: "" },
        { dia: 17, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana II da Páscoa", tipo: "", semana: "" },
        { dia: 18, diaSemana: "Sábado", evento: "Sábado da Semana II da Páscoa", tipo: "", semana: "" },
        { dia: 19, diaSemana: "Domingo", evento: "Domingo III da Páscoa", tipo: "", semana: "III" },
        { dia: 20, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana III da Páscoa", tipo: "", semana: "" },
        { dia: 21, diaSemana: "Terça-Feira", evento: "Santo Anselmo, bispo e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 22, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana III da Páscoa", tipo: "", semana: "" },
        { dia: 23, diaSemana: "Quinta-Feira", evento: "Santo Adalberto, bispo e mártir / São Jorge, mártir", tipo: "m", semana: "" },
        { dia: 24, diaSemana: "Sexta-Feira", evento: "São Fidel de Sigmaringa, presbítero e mártir", tipo: "m", semana: "" },
        { dia: 25, diaSemana: "Sábado", evento: "São Marcos, evangelista", tipo: "F", semana: "" },
        { dia: 26, diaSemana: "Domingo", evento: "Domingo IV da Páscoa", tipo: "", semana: "IV" },
        { dia: 27, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana IV da Páscoa", tipo: "", semana: "" },
        { dia: 28, diaSemana: "Terça-Feira", evento: "São Luís Maria Grignion de Montfort, presbítero / São Pedro Chanel, presbítero e mártir", tipo: "m", semana: "" },
        { dia: 29, diaSemana: "Quarta-Feira", evento: "Santa Catarina de Siena, virgem e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 30, diaSemana: "Quinta-Feira", evento: "São Pio V, papa", tipo: "m", semana: "" },
      ]
    },
    {
      nome: "Maio",
      tempo: "Tempo Pascal / Tempo Comum",
      corTempo: "from-red-600 to-green-600",
      dias: [
        { dia: 1, diaSemana: "Sexta-Feira", evento: "São José Operário", tipo: "m", semana: "IV", tempo: "Tempo Pascal" },
        { dia: 2, diaSemana: "Sábado", evento: "Santo Atanásio, bispo e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 3, diaSemana: "Domingo", evento: "Domingo V da Páscoa", tipo: "", semana: "I" },
        { dia: 4, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana V da Páscoa", tipo: "", semana: "" },
        { dia: 5, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana V da Páscoa", tipo: "", semana: "" },
        { dia: 6, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana V da Páscoa", tipo: "", semana: "" },
        { dia: 7, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana V da Páscoa", tipo: "", semana: "" },
        { dia: 8, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana V da Páscoa", tipo: "", semana: "" },
        { dia: 9, diaSemana: "Sábado", evento: "Sábado da Semana V da Páscoa", tipo: "", semana: "" },
        { dia: 10, diaSemana: "Domingo", evento: "Domingo VI da Páscoa", tipo: "", semana: "II" },
        { dia: 11, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana VI da Páscoa", tipo: "", semana: "" },
        { dia: 12, diaSemana: "Terça-Feira", evento: "Santos Nereu e Aquileu, mártires / São Pancrácio, mártir", tipo: "m", semana: "" },
        { dia: 13, diaSemana: "Quarta-Feira", evento: "Nossa Senhora de Fátima", tipo: "m", semana: "" },
        { dia: 14, diaSemana: "Quinta-Feira", evento: "São Matias, apóstolo", tipo: "F", semana: "" },
        { dia: 15, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana VI da Páscoa", tipo: "", semana: "" },
        { dia: 16, diaSemana: "Sábado", evento: "Sábado da Semana VI da Páscoa", tipo: "", semana: "" },
        { dia: 17, diaSemana: "Domingo", evento: "Ascensão do Senhor", tipo: "S", semana: "III" },
        { dia: 18, diaSemana: "Segunda-Feira", evento: "São João I, papa e mártir", tipo: "m", semana: "" },
        { dia: 19, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana VII da Páscoa", tipo: "", semana: "" },
        { dia: 20, diaSemana: "Quarta-Feira", evento: "São Bernardino de Siena, presbítero", tipo: "m", semana: "" },
        { dia: 21, diaSemana: "Quinta-Feira", evento: "Santos Cristóvão de Magalhães, presbítero, e Companheiros, mártires", tipo: "m", semana: "" },
        { dia: 22, diaSemana: "Sexta-Feira", evento: "Santa Rita de Cássia, religiosa", tipo: "m", semana: "" },
        { dia: 23, diaSemana: "Sábado", evento: "Sábado da Semana VII da Páscoa", tipo: "", semana: "" },
        { dia: 24, diaSemana: "Domingo", evento: "Domingo de Pentecostes", tipo: "S", semana: "I", tempo: "Pentecostes" },
        { dia: 25, diaSemana: "Segunda-Feira", evento: "Bem-aventurada Virgem Maria, Mãe da Igreja", tipo: "M", semana: "IV", tempo: "Tempo Comum" },
        { dia: 26, diaSemana: "Terça-Feira", evento: "São Filipe Néri, presbítero", tipo: "M", semana: "" },
        { dia: 27, diaSemana: "Quarta-Feira", evento: "Santo Agostinho de Cantuária, bispo", tipo: "m", semana: "" },
        { dia: 28, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana VIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 29, diaSemana: "Sexta-Feira", evento: "São Paulo VI, papa", tipo: "m", semana: "" },
        { dia: 30, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 31, diaSemana: "Domingo", evento: "Santíssima Trindade", tipo: "S", semana: "" },
      ]
    },
    {
      nome: "Junho",
      tempo: "Tempo Comum",
      corTempo: "from-green-600 to-emerald-800",
      dias: [
        { dia: 1, diaSemana: "Segunda-Feira", evento: "São Justino, mártir", tipo: "M", semana: "I", tempo: "Tempo Comum" },
        { dia: 2, diaSemana: "Terça-Feira", evento: "Santos Marcelino e Pedro, mártires", tipo: "m", semana: "" },
        { dia: 3, diaSemana: "Quarta-Feira", evento: "Santos Carlos Lwanga e Companheiros, mártires", tipo: "M", semana: "" },
        { dia: 4, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana IX do Tempo Comum", tipo: "", semana: "" },
        { dia: 5, diaSemana: "Sexta-Feira", evento: "São Bonifácio, bispo e mártir", tipo: "M", semana: "" },
        { dia: 6, diaSemana: "Sábado", evento: "São Norberto, bispo / Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 7, diaSemana: "Domingo", evento: "Santíssimo Corpo e Sangue de Cristo", tipo: "S", semana: "II" },
        { dia: 8, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana X do Tempo Comum", tipo: "", semana: "" },
        { dia: 9, diaSemana: "Terça-Feira", evento: "Santo Efrém, diácono e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 10, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana X do Tempo Comum", tipo: "", semana: "" },
        { dia: 11, diaSemana: "Quinta-Feira", evento: "São Barnabé, apóstolo", tipo: "M", semana: "" },
        { dia: 12, diaSemana: "Sexta-Feira", evento: "Sagrado Coração de Jesus", tipo: "S", semana: "" },
        { dia: 13, diaSemana: "Sábado", evento: "Imaculado Coração da Virgem Santa Maria / Santo António de Lisboa, presbítero e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 14, diaSemana: "Domingo", evento: "Domingo XI do Tempo Comum", tipo: "", semana: "III" },
        { dia: 15, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XI do Tempo Comum", tipo: "", semana: "" },
        { dia: 16, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XI do Tempo Comum", tipo: "", semana: "" },
        { dia: 17, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana XI do Tempo Comum", tipo: "", semana: "" },
        { dia: 18, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XI do Tempo Comum", tipo: "", semana: "" },
        { dia: 19, diaSemana: "Sexta-Feira", evento: "São Romualdo, abade", tipo: "m", semana: "" },
        { dia: 20, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 21, diaSemana: "Domingo", evento: "Domingo XII do Tempo Comum", tipo: "", semana: "IV" },
        { dia: 22, diaSemana: "Segunda-Feira", evento: "Santos João Fisher, bispo, e Tomás Moro, mártires / São Paulino de Nola, bispo", tipo: "m", semana: "" },
        { dia: 23, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XII do Tempo Comum", tipo: "", semana: "" },
        { dia: 24, diaSemana: "Quarta-Feira", evento: "Nascimento de São João Batista", tipo: "S", semana: "" },
        { dia: 25, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XII do Tempo Comum", tipo: "", semana: "" },
        { dia: 26, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XII do Tempo Comum", tipo: "", semana: "" },
        { dia: 27, diaSemana: "Sábado", evento: "São Cirilo de Alexandria, bispo e doutor da Igreja / Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 28, diaSemana: "Domingo", evento: "Domingo XIII do Tempo Comum", tipo: "", semana: "I" },
        { dia: 29, diaSemana: "Segunda-Feira", evento: "Santos Pedro e Paulo, apóstolos", tipo: "S", semana: "" },
        { dia: 30, diaSemana: "Terça-Feira", evento: "Primeiros Santos Mártires da Igreja de Roma", tipo: "m", semana: "" },
      ]
    },
    {
      nome: "Julho",
      tempo: "Tempo Comum",
      corTempo: "from-green-600 to-emerald-800",
      dias: [
        { dia: 1, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana XIII do Tempo Comum", tipo: "", semana: "I", tempo: "Tempo Comum" },
        { dia: 2, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 3, diaSemana: "Sexta-Feira", evento: "São Tomé, apóstolo", tipo: "F", semana: "" },
        { dia: 4, diaSemana: "Sábado", evento: "Santa Isabel de Portugal / Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 5, diaSemana: "Domingo", evento: "Domingo XIV do Tempo Comum", tipo: "", semana: "II" },
        { dia: 6, diaSemana: "Segunda-Feira", evento: "Santa Maria Goretti, virgem e mártir", tipo: "m", semana: "" },
        { dia: 7, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XIV do Tempo Comum", tipo: "", semana: "" },
        { dia: 8, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana XIV do Tempo Comum", tipo: "", semana: "" },
        { dia: 9, diaSemana: "Quinta-Feira", evento: "Santos Agostinho Zao Rong, presbítero, e Companheiros, mártires", tipo: "m", semana: "" },
        { dia: 10, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XIV do Tempo Comum", tipo: "", semana: "" },
        { dia: 11, diaSemana: "Sábado", evento: "São Bento, abade", tipo: "M", semana: "" },
        { dia: 12, diaSemana: "Domingo", evento: "Domingo XV do Tempo Comum", tipo: "", semana: "III" },
        { dia: 13, diaSemana: "Segunda-Feira", evento: "Santo Henrique", tipo: "m", semana: "" },
        { dia: 14, diaSemana: "Terça-Feira", evento: "São Camilo de Lellis, presbítero", tipo: "m", semana: "" },
        { dia: 15, diaSemana: "Quarta-Feira", evento: "São Boaventura, bispo e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 16, diaSemana: "Quinta-Feira", evento: "Nossa Senhora do Carmo", tipo: "m", semana: "" },
        { dia: 17, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XV do Tempo Comum", tipo: "", semana: "" },
        { dia: 18, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 19, diaSemana: "Domingo", evento: "Domingo XVI do Tempo Comum", tipo: "", semana: "IV" },
        { dia: 20, diaSemana: "Segunda-Feira", evento: "Santo Apolinário, bispo e mártir", tipo: "m", semana: "" },
        { dia: 21, diaSemana: "Terça-Feira", evento: "São Lourenço de Brindes, presbítero e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 22, diaSemana: "Quarta-Feira", evento: "Santa Maria Madalena", tipo: "F", semana: "" },
        { dia: 23, diaSemana: "Quinta-Feira", evento: "Santa Brígida, religiosa", tipo: "m", semana: "" },
        { dia: 24, diaSemana: "Sexta-Feira", evento: "São Sarbélio Makhluf, eremita", tipo: "m", semana: "" },
        { dia: 25, diaSemana: "Sábado", evento: "São Tiago, apóstolo", tipo: "F", semana: "" },
        { dia: 26, diaSemana: "Domingo", evento: "Domingo XVII do Tempo Comum", tipo: "", semana: "I" },
        { dia: 27, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XVII do Tempo Comum", tipo: "", semana: "" },
        { dia: 28, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XVII do Tempo Comum", tipo: "", semana: "" },
        { dia: 29, diaSemana: "Quarta-Feira", evento: "Santos Marta, Maria e Lázaro", tipo: "M", semana: "" },
        { dia: 30, diaSemana: "Quinta-Feira", evento: "São Pedro Crisólogo, bispo e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 31, diaSemana: "Sexta-Feira", evento: "Santo Inácio de Loiola, presbítero", tipo: "M", semana: "" },
      ]
    },
    {
      nome: "Agosto",
      tempo: "Tempo Comum",
      corTempo: "from-green-600 to-emerald-800",
      dias: [
        { dia: 1, diaSemana: "Sábado", evento: "Santo Afonso de Ligório, bispo e doutor da Igreja", tipo: "M", semana: "I", tempo: "Tempo Comum" },
        { dia: 2, diaSemana: "Domingo", evento: "Domingo XVIII do Tempo Comum", tipo: "", semana: "II" },
        { dia: 3, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XVIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 4, diaSemana: "Terça-Feira", evento: "São João Maria Vianney, presbítero", tipo: "M", semana: "" },
        { dia: 5, diaSemana: "Quarta-Feira", evento: "Dedicação da Basílica de Santa Maria Maior", tipo: "m", semana: "" },
        { dia: 6, diaSemana: "Quinta-Feira", evento: "Transfiguração do Senhor", tipo: "F", semana: "" },
        { dia: 7, diaSemana: "Sexta-Feira", evento: "Santos Sisto II, papa, e Companheiros, mártires / São Caetano, presbítero", tipo: "m", semana: "" },
        { dia: 8, diaSemana: "Sábado", evento: "São Domingos, presbítero", tipo: "M", semana: "" },
        { dia: 9, diaSemana: "Domingo", evento: "Domingo XIX do Tempo Comum", tipo: "", semana: "III" },
        { dia: 10, diaSemana: "Segunda-Feira", evento: "São Lourenço, diácono e mártir", tipo: "F", semana: "" },
        { dia: 11, diaSemana: "Terça-Feira", evento: "Santa Clara, virgem", tipo: "M", semana: "" },
        { dia: 12, diaSemana: "Quarta-Feira", evento: "Santa Joana Francisca de Chantal, religiosa", tipo: "m", semana: "" },
        { dia: 13, diaSemana: "Quinta-Feira", evento: "Santos Ponciano, papa, e Hipólito, presbítero, mártires", tipo: "m", semana: "" },
        { dia: 14, diaSemana: "Sexta-Feira", evento: "São Maximiliano Maria Kolbe, presbítero e mártir", tipo: "M", semana: "" },
        { dia: 15, diaSemana: "Sábado", evento: "Assunção da Virgem Santa Maria", tipo: "S", semana: "" },
        { dia: 16, diaSemana: "Domingo", evento: "Domingo XX do Tempo Comum", tipo: "", semana: "IV" },
        { dia: 17, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XX do Tempo Comum", tipo: "", semana: "" },
        { dia: 18, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XX do Tempo Comum", tipo: "", semana: "" },
        { dia: 19, diaSemana: "Quarta-Feira", evento: "São João Eudes, presbítero", tipo: "m", semana: "" },
        { dia: 20, diaSemana: "Quinta-Feira", evento: "São Bernardo, abade e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 21, diaSemana: "Sexta-Feira", evento: "São Pio X, papa", tipo: "M", semana: "" },
        { dia: 22, diaSemana: "Sábado", evento: "Virgem Santa Maria, Rainha", tipo: "M", semana: "" },
        { dia: 23, diaSemana: "Domingo", evento: "Domingo XXI do Tempo Comum", tipo: "", semana: "I" },
        { dia: 24, diaSemana: "Segunda-Feira", evento: "São Bartolomeu, apóstolo", tipo: "F", semana: "" },
        { dia: 25, diaSemana: "Terça-Feira", evento: "São José de Calasanz, presbítero / São Luís de França", tipo: "m", semana: "" },
        { dia: 26, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana XXI do Tempo Comum", tipo: "", semana: "" },
        { dia: 27, diaSemana: "Quinta-Feira", evento: "Santa Mónica", tipo: "M", semana: "" },
        { dia: 28, diaSemana: "Sexta-Feira", evento: "Santo Agostinho, bispo e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 29, diaSemana: "Sábado", evento: "Martírio de São João Batista", tipo: "M", semana: "" },
        { dia: 30, diaSemana: "Domingo", evento: "Domingo XXII do Tempo Comum", tipo: "", semana: "II" },
        { dia: 31, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XXII do Tempo Comum", tipo: "", semana: "" },
      ]
    },
    {
      nome: "Setembro",
      tempo: "Tempo Comum",
      corTempo: "from-green-600 to-emerald-800",
      dias: [
        { dia: 1, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XXII do Tempo Comum", tipo: "", semana: "II", tempo: "Tempo Comum" },
        { dia: 2, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana XXII do Tempo Comum", tipo: "", semana: "" },
        { dia: 3, diaSemana: "Quinta-Feira", evento: "São Gregório Magno, papa e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 4, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXII do Tempo Comum", tipo: "", semana: "" },
        { dia: 5, diaSemana: "Sábado", evento: "Santa Teresa de Calcutá, virgem / Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 6, diaSemana: "Domingo", evento: "Domingo XXIII do Tempo Comum", tipo: "", semana: "III" },
        { dia: 7, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XXIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 8, diaSemana: "Terça-Feira", evento: "Natividade da Virgem Santa Maria", tipo: "F", semana: "" },
        { dia: 9, diaSemana: "Quarta-Feira", evento: "São Pedro Claver, presbítero", tipo: "m", semana: "" },
        { dia: 10, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XXIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 11, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 12, diaSemana: "Sábado", evento: "Santíssimo Nome de Maria", tipo: "m", semana: "" },
        { dia: 13, diaSemana: "Domingo", evento: "Domingo XXIV do Tempo Comum", tipo: "", semana: "IV" },
        { dia: 14, diaSemana: "Segunda-Feira", evento: "Exaltação da Santa Cruz", tipo: "F", semana: "" },
        { dia: 15, diaSemana: "Terça-Feira", evento: "Nossa Senhora das Dores", tipo: "M", semana: "" },
        { dia: 16, diaSemana: "Quarta-Feira", evento: "Santos Cornélio, papa, e Cipriano, bispo, mártires", tipo: "M", semana: "" },
        { dia: 17, diaSemana: "Quinta-Feira", evento: "Santa Hildegarda de Bingen, virgem e doutora da Igreja / São Roberto Belarmino, bispo e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 18, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXIV do Tempo Comum", tipo: "", semana: "" },
        { dia: 19, diaSemana: "Sábado", evento: "São Januário, bispo e mártir / Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 20, diaSemana: "Domingo", evento: "Domingo XXV do Tempo Comum", tipo: "", semana: "I" },
        { dia: 21, diaSemana: "Segunda-Feira", evento: "São Mateus, apóstolo e evangelista", tipo: "F", semana: "" },
        { dia: 22, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XXV do Tempo Comum", tipo: "", semana: "" },
        { dia: 23, diaSemana: "Quarta-Feira", evento: "São Pio de Pietrelcina, presbítero", tipo: "M", semana: "" },
        { dia: 24, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XXV do Tempo Comum", tipo: "", semana: "" },
        { dia: 25, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXV do Tempo Comum", tipo: "", semana: "" },
        { dia: 26, diaSemana: "Sábado", evento: "Santos Cosme e Damião, mártires / Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 27, diaSemana: "Domingo", evento: "Domingo XXVI do Tempo Comum", tipo: "", semana: "II" },
        { dia: 28, diaSemana: "Segunda-Feira", evento: "Santos Lourenço Ruiz e Companheiros, mártires / São Venceslau, mártir", tipo: "m", semana: "" },
        { dia: 29, diaSemana: "Terça-Feira", evento: "Santos Miguel, Gabriel e Rafael, Arcanjos", tipo: "F", semana: "" },
        { dia: 30, diaSemana: "Quarta-Feira", evento: "São Jerônimo, presbítero e doutor da Igreja", tipo: "M", semana: "" },
      ]
    },
    {
      nome: "Outubro",
      tempo: "Tempo Comum",
      corTempo: "from-green-600 to-emerald-800",
      dias: [
        { dia: 1, diaSemana: "Quinta-Feira", evento: "Santa Teresa do Menino Jesus, virgem e doutor da Igreja", tipo: "M", semana: "II", tempo: "Tempo Comum" },
        { dia: 2, diaSemana: "Sexta-Feira", evento: "Santos Anjos da Guarda", tipo: "M", semana: "" },
        { dia: 3, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 4, diaSemana: "Domingo", evento: "Domingo XXVII do Tempo Comum", tipo: "", semana: "III" },
        { dia: 5, diaSemana: "Segunda-Feira", evento: "Santa Faustina Kowalska, virgem", tipo: "m", semana: "" },
        { dia: 6, diaSemana: "Terça-Feira", evento: "São Bruno, presbítero", tipo: "m", semana: "" },
        { dia: 7, diaSemana: "Quarta-Feira", evento: "Nossa Senhora do Rosário", tipo: "M", semana: "" },
        { dia: 8, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XXVII do Tempo Comum", tipo: "", semana: "" },
        { dia: 9, diaSemana: "Sexta-Feira", evento: "Santos Dionísio, bispo, e Companheiros, mártires / São João Leonardo, presbítero", tipo: "m", semana: "" },
        { dia: 10, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 11, diaSemana: "Domingo", evento: "Domingo XXVIII do Tempo Comum", tipo: "", semana: "IV" },
        { dia: 12, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XXVIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 13, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XXVIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 14, diaSemana: "Quarta-Feira", evento: "São Calisto I, papa e mártir", tipo: "m", semana: "" },
        { dia: 15, diaSemana: "Quinta-Feira", evento: "Santa Teresa de Jesus, virgem e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 16, diaSemana: "Sexta-Feira", evento: "Santa Hedwiges, religiosa / Santa Margarida Maria Alacoque, virgem", tipo: "m", semana: "" },
        { dia: 17, diaSemana: "Sábado", evento: "Santo Inácio de Antioquia, bispo e mártir", tipo: "M", semana: "" },
        { dia: 18, diaSemana: "Domingo", evento: "Domingo XXIX do Tempo Comum", tipo: "", semana: "I" },
        { dia: 19, diaSemana: "Segunda-Feira", evento: "Santos João de Brébeuf, Isaac Jogues, presbíteros, e Companheiros, mártires / São Paulo da Cruz, presbítero", tipo: "m", semana: "" },
        { dia: 20, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XXIX do Tempo Comum", tipo: "", semana: "" },
        { dia: 21, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana XXIX do Tempo Comum", tipo: "", semana: "" },
        { dia: 22, diaSemana: "Quinta-Feira", evento: "São João Paulo II, papa", tipo: "m", semana: "" },
        { dia: 23, diaSemana: "Sexta-Feira", evento: "São João de Capistrano, presbítero", tipo: "m", semana: "" },
        { dia: 24, diaSemana: "Sábado", evento: "Santo Antônio Maria Claret, bispo / Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 25, diaSemana: "Domingo", evento: "Domingo XXX do Tempo Comum", tipo: "", semana: "II" },
        { dia: 26, diaSemana: "Segunda-Feira", evento: "Segunda-Feira da Semana XXX do Tempo Comum", tipo: "", semana: "" },
        { dia: 27, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana XXX do Tempo Comum", tipo: "", semana: "" },
        { dia: 28, diaSemana: "Quarta-Feira", evento: "Santos Simão e Judas, apóstolos", tipo: "F", semana: "" },
        { dia: 29, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XXX do Tempo Comum", tipo: "", semana: "" },
        { dia: 30, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXX do Tempo Comum", tipo: "", semana: "" },
        { dia: 31, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
      ]
    },
    {
      nome: "Novembro",
      tempo: "Tempo Comum / Advento",
      corTempo: "from-green-600 via-green-500 to-purple-600",
      dias: [
        { dia: 1, diaSemana: "Domingo", evento: "Todos os Santos", tipo: "S", semana: "III", tempo: "Tempo Comum" },
        { dia: 2, diaSemana: "Segunda-Feira", evento: "Comemoração de Todos os Fiéis Defuntos", tipo: "", semana: "" },
        { dia: 3, diaSemana: "Terça-Feira", evento: "São Martinho de Porres, religioso", tipo: "m", semana: "" },
        { dia: 4, diaSemana: "Quarta-Feira", evento: "São Carlos Borromeu, bispo", tipo: "M", semana: "" },
        { dia: 5, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XXXI do Tempo Comum", tipo: "", semana: "" },
        { dia: 6, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXXI do Tempo Comum", tipo: "", semana: "" },
        { dia: 7, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 8, diaSemana: "Domingo", evento: "Domingo XXXII do Tempo Comum", tipo: "", semana: "IV" },
        { dia: 9, diaSemana: "Segunda-Feira", evento: "Dedicação da Basílica de Latrão", tipo: "F", semana: "" },
        { dia: 10, diaSemana: "Terça-Feira", evento: "São Leão Magno, papa e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 11, diaSemana: "Quarta-Feira", evento: "São Martinho de Tours, bispo", tipo: "M", semana: "" },
        { dia: 12, diaSemana: "Quinta-Feira", evento: "São Josafá, bispo e mártir", tipo: "M", semana: "" },
        { dia: 13, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXXII do Tempo Comum", tipo: "", semana: "" },
        { dia: 14, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 15, diaSemana: "Domingo", evento: "Domingo XXXIII do Tempo Comum", tipo: "", semana: "I" },
        { dia: 16, diaSemana: "Segunda-Feira", evento: "Santa Gertrudes, virgem / Santa Margarida da Escócia", tipo: "m", semana: "" },
        { dia: 17, diaSemana: "Terça-Feira", evento: "Santa Isabel da Hungria, religiosa", tipo: "M", semana: "" },
        { dia: 18, diaSemana: "Quarta-Feira", evento: "Dedicação das Basílicas dos Santos Pedro e Paulo, apóstolos", tipo: "m", semana: "" },
        { dia: 19, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XXXIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 20, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXXIII do Tempo Comum", tipo: "", semana: "" },
        { dia: 21, diaSemana: "Sábado", evento: "Apresentação de Nossa Senhora", tipo: "M", semana: "" },
        { dia: 22, diaSemana: "Domingo", evento: "Nosso Senhor Jesus Cristo, Rei do Universo", tipo: "S", semana: "II" },
        { dia: 23, diaSemana: "Segunda-Feira", evento: "São Clemente I, papa e mártir / São Columbano, abade", tipo: "m", semana: "" },
        { dia: 24, diaSemana: "Terça-Feira", evento: "Santos André Dũng Lạc, presbítero, e Companheiros, mártires", tipo: "M", semana: "" },
        { dia: 25, diaSemana: "Quarta-Feira", evento: "Santa Catarina de Alexandria, virgem e mártir", tipo: "m", semana: "" },
        { dia: 26, diaSemana: "Quinta-Feira", evento: "Quinta-Feira da Semana XXXIV do Tempo Comum", tipo: "", semana: "" },
        { dia: 27, diaSemana: "Sexta-Feira", evento: "Sexta-Feira da Semana XXXIV do Tempo Comum", tipo: "", semana: "" },
        { dia: 28, diaSemana: "Sábado", evento: "Santa Maria no Sábado", tipo: "m", semana: "" },
        { dia: 29, diaSemana: "Domingo", evento: "Domingo I do Advento", tipo: "", semana: "I", tempo: "Advento" },
        { dia: 30, diaSemana: "Segunda-Feira", evento: "Santo André, apóstolo", tipo: "F", semana: "" },
      ]
    },
    {
      nome: "Dezembro",
      tempo: "Advento / Tempo do Natal",
      corTempo: "from-purple-600 via-purple-500 to-blue-600",
      dias: [
        { dia: 1, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana I do Advento", tipo: "", semana: "I", tempo: "Advento" },
        { dia: 2, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana I do Advento", tipo: "", semana: "" },
        { dia: 3, diaSemana: "Quinta-Feira", evento: "São Francisco Xavier, presbítero", tipo: "M", semana: "" },
        { dia: 4, diaSemana: "Sexta-Feira", evento: "São João Damasceno, presbítero e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 5, diaSemana: "Sábado", evento: "Sábado da Semana I do Advento", tipo: "", semana: "" },
        { dia: 6, diaSemana: "Domingo", evento: "Domingo II do Advento", tipo: "", semana: "II" },
        { dia: 7, diaSemana: "Segunda-Feira", evento: "Santo Ambrósio, bispo e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 8, diaSemana: "Terça-Feira", evento: "Imaculada Conceição da Virgem Santa Maria", tipo: "S", semana: "" },
        { dia: 9, diaSemana: "Quarta-Feira", evento: "São João Diogo Cuauhtlatoatzin", tipo: "m", semana: "" },
        { dia: 10, diaSemana: "Quinta-Feira", evento: "Nossa Senhora de Loreto", tipo: "m", semana: "" },
        { dia: 11, diaSemana: "Sexta-Feira", evento: "São Dâmaso I, papa", tipo: "m", semana: "" },
        { dia: 12, diaSemana: "Sábado", evento: "Nossa Senhora de Guadalupe", tipo: "m", semana: "" },
        { dia: 13, diaSemana: "Domingo", evento: "Domingo III do Advento", tipo: "", semana: "III" },
        { dia: 14, diaSemana: "Segunda-Feira", evento: "São João da Cruz, presbítero e doutor da Igreja", tipo: "M", semana: "" },
        { dia: 15, diaSemana: "Terça-Feira", evento: "Terça-Feira da Semana III do Advento", tipo: "", semana: "" },
        { dia: 16, diaSemana: "Quarta-Feira", evento: "Quarta-Feira da Semana III do Advento", tipo: "", semana: "" },
        { dia: 17, diaSemana: "Quinta-Feira", evento: "Féria do Advento (Dezembro 17)", tipo: "", semana: "" },
        { dia: 18, diaSemana: "Sexta-Feira", evento: "Féria do Advento (Dezembro 18)", tipo: "", semana: "" },
        { dia: 19, diaSemana: "Sábado", evento: "Féria do Advento (Dezembro 19)", tipo: "", semana: "" },
        { dia: 20, diaSemana: "Domingo", evento: "Domingo IV do Advento", tipo: "", semana: "IV" },
        { dia: 21, diaSemana: "Segunda-Feira", evento: "São Pedro Canísio, presbítero e doutor da Igreja", tipo: "m", semana: "" },
        { dia: 22, diaSemana: "Terça-Feira", evento: "Féria do Advento (Dezembro 22)", tipo: "", semana: "" },
        { dia: 23, diaSemana: "Quarta-Feira", evento: "São João de Quenty, presbítero", tipo: "m", semana: "" },
        { dia: 24, diaSemana: "Quinta-Feira", evento: "Féria do Advento (Dezembro 24)", tipo: "", semana: "" },
        { dia: 25, diaSemana: "Sexta-Feira", evento: "Natal do Senhor", tipo: "S", semana: "IV", tempo: "Tempo do Natal" },
        { dia: 26, diaSemana: "Sábado", evento: "Santo Estêvão, primeiro mártir", tipo: "F", semana: "" },
        { dia: 27, diaSemana: "Domingo", evento: "Sagrada Família de Jesus, Maria e José", tipo: "F", semana: "I" },
        { dia: 28, diaSemana: "Segunda-Feira", evento: "Santos Inocentes, mártires", tipo: "F", semana: "" },
        { dia: 29, diaSemana: "Terça-Feira", evento: "São Tomás Becket, bispo e mártir", tipo: "m", semana: "" },
        { dia: 30, diaSemana: "Quarta-Feira", evento: "6º dia da Oitava do Natal", tipo: "", semana: "" },
        { dia: 31, diaSemana: "Quinta-Feira", evento: "São Silvestre I, papa", tipo: "m", semana: "" },
      ]
    }
  ];

  const getCorTipo = (tipo: string) => {
    switch (tipo) {
      case 'S': return 'bg-purple-100 text-purple-800 border border-purple-300';
      case 'F': return 'bg-red-100 text-red-800 border border-red-300';
      case 'M': return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'm': return 'bg-green-100 text-green-800 border border-green-300';
      default: return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getDescricaoTipo = (tipo: string) => {
    switch (tipo) {
      case 'S': return 'Solenidade';
      case 'F': return 'Festa';
      case 'M': return 'Memória obrigatória';
      case 'm': return 'Memória facultativa';
      default: return 'Féria';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation />

      {/* Seção com imagem de fundo como faixa - RESPONSIVA */}
      <section className="relative w-full overflow-hidden h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
        <img 
          src="/calendariofundo.png" 
          alt="Fundo do Calendário Litúrgico"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] sm:object-[center_45%] md:object-[center_50%]"
          // Ajuste responsivo do ponto focal
          // Mobile: 40% da altura
          // Tablet: 45% da altura  
          // Desktop: 50% da altura
        />
        
        {/* Overlay para melhor legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
        
        {/* Conteúdo sobre a imagem - RESPONSIVO */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <div className="inline-block mb-3 sm:mb-4">
              <Calendar className="text-white mx-auto" size={36} sm:size={40} md:size={48} strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white">
              Calendário Litúrgico 2026
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Calendário completo da Igreja Católica - Ano 2026
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Legenda das Cores Litúrgicas - RESPONSIVA */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} sm:size={24} />
            Legenda das Cores e Abreviaturas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Cores dos Tempos Litúrgicos */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Cores dos Tempos</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded"></div>
                  <span className="text-xs sm:text-sm">Tempo do Natal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-600 to-emerald-800 rounded"></div>
                  <span className="text-xs sm:text-sm">Tempo Comum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-600 via-green-500 to-purple-600 rounded"></div>
                  <span className="text-xs sm:text-sm">Transição Comum → Quaresma/Advento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded"></div>
                  <span className="text-xs sm:text-sm">Transição Advento → Natal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded"></div>
                  <span className="text-xs sm:text-sm">Quaresma/Advento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-red-600 to-red-800 rounded"></div>
                  <span className="text-xs sm:text-sm">Tríduo Pascal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-red-600 to-green-600 rounded"></div>
                  <span className="text-xs sm:text-sm">Tempo Pascal → Comum (Maio)</span>
                </div>
              </div>
            </div>

            {/* Tipos de Celebrações */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Tipos de Celebrações</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-purple-100 text-purple-800 text-xs rounded font-bold">S</span>
                  <span className="text-xs sm:text-sm">Solenidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-100 text-red-800 text-xs rounded font-bold">F</span>
                  <span className="text-xs sm:text-sm">Festa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 text-blue-800 text-xs rounded font-bold">M</span>
                  <span className="text-xs sm:text-sm">Memória obrigatória</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-100 text-green-800 text-xs rounded font-bold">m</span>
                  <span className="text-xs sm:text-sm">Memória facultativa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-800 text-xs rounded font-bold"></span>
                  <span className="text-xs sm:text-sm">Féria</span>
                </div>
              </div>
            </div>

            {/* Semanas Litúrgicas */}
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3 sm:p-4 border border-indigo-200">
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Semanas Litúrgicas</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-indigo-100 text-indigo-800 text-xs rounded font-bold">I-XXXIV</span>
                  <span className="text-xs sm:text-sm">Tempo Comum</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-indigo-100 text-indigo-800 text-xs rounded font-bold">I-VI</span>
                  <span className="text-xs sm:text-sm">Tempo Pascal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-indigo-100 text-indigo-800 text-xs rounded font-bold">I-V</span>
                  <span className="text-xs sm:text-sm">Quaresma</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-indigo-100 text-indigo-800 text-xs rounded font-bold">I-IV</span>
                  <span className="text-xs sm:text-sm">Advento</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Meses RESPONSIVO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {calendarioMeses.map((mes, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden border border-gray-200 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300"
            >
              {/* Cabeçalho do Mês COM COR DO TEMPO */}
              <div 
                className={`bg-gradient-to-r ${mes.corTempo} p-4 sm:p-5 cursor-pointer`}
                onClick={() => alternarMes(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {mes.nome}
                    </h3>
                    <p className="text-xs sm:text-sm mt-1 text-white/90">
                      {mes.tempo}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg px-2 py-1 sm:px-3 sm:py-1 bg-white/20">
                      <span className="font-semibold text-xs sm:text-sm text-white">
                        {mes.dias.length} dias
                      </span>
                    </div>
                    {mesesExpandidos.includes(index) ? (
                      <ChevronUp className="text-white" size={18} sm:size={20} />
                    ) : (
                      <ChevronDown className="text-white" size={18} sm:size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Conteúdo Expandido (DROPDOWN) */}
              {mesesExpandidos.includes(index) && mes.dias.length > 0 && (
                <div className="p-3 sm:p-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                  <div className="space-y-2.5 sm:space-y-3">
                    {mes.dias.map((dia, idx) => (
                      <div 
                        key={idx} 
                        className={`border-l-4 ${dia.tempo === 'Quaresma' ? 'border-purple-500' : 
                                   dia.tempo === 'Advento' ? 'border-purple-400' :
                                   dia.tempo === 'Tempo Comum' ? 'border-green-500' : 
                                   dia.tempo === 'Tempo do Natal' ? 'border-blue-500' : 
                                   dia.tempo === 'Tempo Pascal' ? 'border-gray-400' :
                                   dia.tempo === 'Tríduo Pascal' ? 'border-red-500' :
                                   dia.tempo === 'Semana Santa' ? 'border-purple-300' :
                                   dia.tempo === 'Pentecostes' ? 'border-gray-300' :
                                   'border-gray-300'} 
                                   pl-3 sm:pl-4 pb-2.5 sm:pb-3 last:pb-0`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          {/* Número do Dia e Semana */}
                          <div className="flex-shrink-0">
                            <div className="bg-gray-100 rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center">
                              <span className="font-bold text-gray-900 text-base sm:text-lg">{dia.dia}</span>
                              {dia.semana && (
                                <span className="text-xs text-blue-600 font-semibold">
                                  {dia.semana}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Detalhes do Dia */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{dia.diaSemana}</span>
                              {dia.tipo && (
                                <span className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-xs font-bold ${getCorTipo(dia.tipo)}`}>
                                  {dia.tipo}
                                </span>
                              )}
                            </div>
                            
                            {/* Mostra mudança de tempo se for diferente do tempo principal */}
                            {dia.tempo && (
                              <div className="mb-1 sm:mb-2">
                                <span className={`text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded ${
                                  dia.tempo === 'Tempo Comum' ? 'bg-green-100 text-green-800 border border-green-300' :
                                  dia.tempo === 'Quaresma' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                                  dia.tempo === 'Advento' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                                  dia.tempo === 'Tempo do Natal' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                                  dia.tempo === 'Tempo Pascal' ? 'bg-gray-100 text-gray-800 border border-gray-300' :
                                  dia.tempo === 'Tríduo Pascal' ? 'bg-red-100 text-red-800 border border-red-300' :
                                  dia.tempo === 'Semana Santa' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                                  dia.tempo === 'Pentecostes' ? 'bg-gray-100 text-gray-800 border border-gray-300' :
                                  'bg-gray-100 text-gray-800 border border-gray-300'
                                }`}>
                                  {dia.tempo}
                                </span>
                              </div>
                            )}
                            
                            <p className="text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
                              {dia.evento}
                            </p>
                            
                            {dia.tipo && (
                              <p className="text-xs text-gray-500">
                                {getDescricaoTipo(dia.tipo)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rodapé */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <button
                  onClick={() => alternarMes(index)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center gap-1 w-full"
                >
                  {mesesExpandidos.includes(index) ? 'Fechar detalhes' : 'Ver todas as celebrações'}
                  {mesesExpandidos.includes(index) ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Links Rápidos - RESPONSIVO */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link 
            to="/missas" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <Calendar size={16} sm:size={18} />
            <span>Horários de Missas</span>
          </Link>
          
          <Link 
            to="/liturgia" 
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors border border-blue-300 shadow-sm hover:shadow text-sm sm:text-base"
          >
            <BookOpen size={16} sm:size={18} />
            <span>Liturgia do Dia</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}