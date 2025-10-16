'use client';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import Spinner from '@/components/feedback/Spinner';
import Empty from '@/components/feedback/Empty';
import ErrorMessage from '@/components/feedback/ErrorMessage';

type KpiRes = {
  kpis: { label: string; value: number }[];
  series: { date: string; value: number }[];
};

const ranges = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
];

export default function ReportsView() {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<KpiRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await api.get<KpiRes>(`/api/reports?days=${days}`);
      setData(res);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro';
      setErr(message);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Relatórios</h1>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setDays(r.value)}
              className={`px-3 py-1 rounded border ${
                days === r.value ? 'bg-gray-900 text-white' : 'bg-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <Spinner label="Carregando relatórios…" />}
      {err && <ErrorMessage message={err} />}

      {data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.kpis.map((k, i) => (
              <div key={`${k.label}-${i}`} className="rounded border p-3 bg-white">
                <p className="text-sm text-gray-500">{k.label}</p>
                <p className="text-2xl font-semibold">{k.value}</p>
              </div>
            ))}
          </div>

          <div className="h-80 rounded border bg-white p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="Atividade" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {!loading && !err && !data && (
        <Empty
          title="Nenhum dado para exibir"
          description="Ajuste o período acima para tentar novamente."
        />
      )}
    </div>
  );
}


