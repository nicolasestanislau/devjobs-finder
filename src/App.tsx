import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

interface Job {
  id: number;
  title: string;
  company_name: string;
  job_type: string;
  category: string;
  url: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("https://remotive.io/api/remote-jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs.slice(0, 20)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const results = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(results);
  }, [search, jobs]);
console.log('jobs: ', jobs)
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">DevJobs Finder</h1>
      <Input
        placeholder="Buscar por vaga"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
        data-testid="search-input"
      />
      <div className="space-y-4" data-testid="job-list">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company_name}</p>
              <p className="text-sm">Tipo: {job.job_type}</p>
              <p className="text-sm">Categoria: {job.category}</p>
              <a href={job.url} target="_blank" rel="noopener">
                <Button className="mt-2">Ver vaga</Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
