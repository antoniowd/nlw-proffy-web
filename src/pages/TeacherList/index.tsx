import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import "./styles.css";
import api from "../../services/api";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState({
    subject: "",
    week_day: "",
    time: "",
  });

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        ...filter,
      },
    });

    setTeachers(response.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={filter.subject}
            onChange={handleChange}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Quimica", label: "Quimica" },
              { value: "Biologia", label: "Biologia" },
              { value: "Fisica", label: "Fisica" },
              { value: "Matematica", label: "Matematica" },
              { value: "Ciencias", label: "Ciencias" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={filter.week_day}
            onChange={handleChange}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            name="time"
            label="Hora"
            value={filter.time}
            onChange={handleChange}
            type="time"
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((item: Teacher) => (
          <TeacherItem key={item.id} teacher={item} />
        ))}
      </main>
    </div>
  );
}
