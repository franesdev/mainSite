import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la navegación
import * as XLSX from 'xlsx';

interface Question {
  number: number;
  text: string;
  answer: string;
}

const GenerateTest = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate(); // Hook para navegar entre páginas

  // Función para manejar la carga de archivos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<any>(sheet, { header: 1 });

        const parsedQuestions: Question[] = jsonData.slice(1).map((row: any) => ({
          number: row[0],
          text: row[1],
          answer: row[2],
        }));

        setQuestions(parsedQuestions); // Actualiza el estado con las preguntas cargadas
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Función para generar 4 tests a partir de las preguntas cargadas
  const generateTests = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const numberOfTests = 6;
    const questionsPerTest = Math.ceil(shuffledQuestions.length / numberOfTests);

    const tests = Array.from({ length: numberOfTests }, (_, index) => {
      return shuffledQuestions.slice(index * questionsPerTest, (index + 1) * questionsPerTest);
    });

    tests.forEach((test, index) => downloadTestAsExcel(test, index + 1));
  };

  // Función para descargar cada test como archivo Excel
  const downloadTestAsExcel = (test: Question[], testNumber: number) => {
    const worksheetData = test.map((question) => [
      question.number,
      question.text,
      question.answer
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Number', 'Question', 'Answer'], // Encabezados
      ...worksheetData
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Test ${testNumber}`);

    // Genera un archivo Excel y descarga
    XLSX.writeFile(workbook, `Test_${testNumber}.xlsx`);
  };

  // Función para volver a la página principal
  const goBack = () => {
    navigate('/'); // Navegar a la página principal (ruta '/')
  };

  return (
    <div>
      <h1>Generar Test</h1>
      
      {/* Botón estilizado para volver a la página principal */}
      <button 
        onClick={goBack} 
        style={{
          backgroundColor: '#4CAF50', // Color de fondo verde
          color: 'white', // Color del texto blanco
          border: 'none', // Sin borde
          padding: '10px 20px', // Espaciado interno
          textAlign: 'center', // Alinear el texto
          textDecoration: 'none', // Sin subrayado
          display: 'inline-block', 
          fontSize: '16px', // Tamaño de fuente
          margin: '10px 2px', // Espaciado externo
          cursor: 'pointer', // Cursor de puntero
          borderRadius: '12px', // Bordes redondeados
          transition: 'background-color 0.3s ease', // Transición suave al pasar el mouse
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'} // Efecto al pasar el mouse
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'} // Vuelve al color original
      >
        Atrás
      </button>

      {/* Botón para cargar el archivo Excel */}
      <input type="file" onChange={handleFileUpload} />

      {/* Mostrar botón para generar los tests si ya se han cargado las preguntas */}
      {questions.length > 0 && (
        <button  style={{
          backgroundColor: '#4CAF50', // Color de fondo verde
          color: 'white', // Color del texto blanco
          border: 'none', // Sin borde
          padding: '10px 20px', // Espaciado interno
          textAlign: 'center', // Alinear el texto
          textDecoration: 'none', // Sin subrayado
          display: 'inline-block', 
          fontSize: '14px', // Tamaño de fuente
          margin: '10px 2px', // Espaciado externo
          cursor: 'pointer', // Cursor de puntero
          borderRadius: '12px', // Bordes redondeados
          transition: 'background-color 0.3s ease', // Transición suave al pasar el mouse
        }} onClick={generateTests}>Generar y Descargar Tests</button>
      )}

      {/* Muestra las preguntas cargadas */}
      <div>
        <h2>Preguntas cargadas:</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.number}>
              {question.number}. {question.text} - {question.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenerateTest;
