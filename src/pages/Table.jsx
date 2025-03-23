import React from 'react';

const Table = () => {
  const data = [
    { date: '24.03.', hours: '1 h', school: 'ZŠ Štěnovice', sex: 'Male', eaten: true },
    { date: '24.03.', hours: '1 h', school: 'ZŠ Štěnovice', sex: 'Female', eaten: false },
    { date: '25.03.', hours: '1 h', school: 'ZŠ Štěnovice', sex: 'Male', eaten: true },
    { date: '25.03.', hours: '1 h', school: 'ZŠ Štěnovice', sex: 'Female', eaten: false },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className="border border-gray-200 rounded-md text-sm whitespace-nowrap">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 text-left">Datum</th>
            <th className="px-2 py-1 text-left">Hodiny</th>
            <th className="px-2 py-1 text-left">Škola</th>
            <th className="px-2 py-1 text-left">Pohlaví</th>
            <th className="px-2 py-1 text-left">Jídlo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="px-2 py-1 flex items-center gap-1">📅 {row.date}</td>
              <td className="px-2 py-1 flex items-center gap-1">⏰ {row.hours}</td>
              <td className="px-2 py-1 flex items-center gap-1">🏫 {row.school}</td>
              <td className="px-2 py-1">{row.sex === 'Male' ? '♂️ Male' : '♀️ Female'}</td>
              <td className="px-2 py-1">{row.eaten ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
