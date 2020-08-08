import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import "./styles.css";

export default function TeacherForm() {
  const history = useHistory();
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);
  const [data, setData] = useState({
    name: "",
    avatar: "",
    whatsapp: "",
    bio: "",
    subject: "",
    cost: "",
  });

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    setScheduleItems(
      scheduleItems.map((item, index) => {
        if (index === position) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      })
    );
  };

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();

    api
      .post("classes", {
        ...data,
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Ok");
        history.push("/");
      })
      .catch(() => {
        alert("Error");
      });
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              onChange={handleChange}
              value={data.name}
              name="name"
              label="Nome completo"
            />
            <Input
              onChange={handleChange}
              value={data.avatar}
              name="avatar"
              label="Avatar"
            />
            <Input
              onChange={handleChange}
              value={data.whatsapp}
              name="whatsapp"
              label="Whatsapp"
            />
            <Textarea
              onChange={handleChange}
              value={data.bio}
              name="bio"
              label="Biografia"
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              onChange={handleChange}
              value={data.subject}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Quimica", label: "Quimica" },
                { value: "Biologia", label: "Biologia" },
                { value: "Fisica", label: "Fisica" },
                { value: "Matematica", label: "Matematica" },
                { value: "Ciencias", label: "Ciencias" },
              ]}
            />
            <Input
              name="cost"
              onChange={handleChange}
              value={data.cost}
              label="Custo da sua hora por aula"
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => (
              <div key={index} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={item.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, "week_day", e.target.value)
                  }
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
                  name="from"
                  label="Das"
                  type="time"
                  value={item.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, "from", e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={item.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, "to", e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button>Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
