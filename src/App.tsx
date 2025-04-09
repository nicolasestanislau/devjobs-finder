import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";

interface Job {
  id: number;
  title: string;
  company_name: string;
  job_type: string;
  category: string;
  url: string;
  company_logo?: string;
  tags?: string[];
  publication_date?: string;
  candidate_required_location?: string;
  salary?: string;
  description?: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface MockResponse {
    ok: boolean;
    json: () => Promise<any>;
  }
  // TODO Use Mock Service Worker
  function fetchMock(
    url: string,
    options: { method: string }
  ): Promise<MockResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/api/exemplo" && options.method === "GET") {
          resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                jobs: [
                  {
                    id: 1591692,
                    url: "https://remotive.com/remote-jobs/devops/senior-devops-engineer-azure-1591692",
                    title: "Senior DevOps Engineer (Azure)",
                    company_name: "Proxify",
                    company_logo: "https://remotive.com/job/1591692/logo",
                    category: "DevOps / Sysadmin",
                    tags: [
                      "api",
                      "C",
                      "java",
                      "react",
                      "swift",
                      "UI/UX",
                      "react native",
                      "apple",
                    ],
                    job_type: "full_time",
                    publication_date: "2025-01-14T16:16:12",
                    candidate_required_location: "CET +/- 3 HOURS",
                    salary: "$45k - $80k",
                    description:
                      "Senior DevOps Engineer position description...",
                    company_logo_url: "https://remotive.com/job/1591692/logo",
                  },
                  {
                    id: 1963367,
                    url: "https://remotive.com/remote-jobs/design/mid-to-senior-ux-ui-designer-1963367",
                    title: "Mid to Senior UX/UI Designer",
                    company_name: "Zemogajobs",
                    company_logo: "https://remotive.com/job/1963367/logo",
                    category: "Design",
                    tags: [
                      "UI/UX",
                      "agile",
                      "product strategy",
                      "research",
                      "responsive",
                      "travel",
                      "digital products",
                    ],
                    job_type: "full_time",
                    publication_date: "2025-01-14T14:50:11",
                    candidate_required_location: "Colombia",
                    salary: "",
                    description: "UX/UI Designer position description...",
                  },
                  {
                    id: 1962565,
                    url: "https://remotive.com/remote-jobs/product/senior-product-lead-1962565",
                    title: "Senior Product Lead",
                    company_name: "Fetch Rewards",
                    company_logo: "https://remotive.com/job/1962565/logo",
                    category: "Product",
                    tags: ["product strategy"],
                    job_type: "full_time",
                    publication_date: "2025-01-14T12:50:42",
                    candidate_required_location: "USA",
                    salary: "",
                  },
                  {
                    id: 1962656,
                    url: "https://remotive.com/remote-jobs/customer-support/integration-middleware-engineer-1962656",
                    title: "Integration/Middleware Engineer",
                    company_name: "BETSOL",
                    company_logo: "https://remotive.com/job/1962656/logo",
                    category: "Customer Service",
                    tags: ["AWS", "GCP", "technical support"],
                    job_type: "full_time",
                    publication_date: "2025-01-14T12:50:36",
                    candidate_required_location: "USA",
                    salary: "",
                  },
                  {
                    id: 1962614,
                    url: "https://remotive.com/remote-jobs/hr/it-talent-acquisition-1962614",
                    title: "IT Talent Acquisition",
                    company_name: "Plain Concepts",
                    company_logo: "https://remotive.com/job/1962614/logo",
                    category: "Human Resources",
                    tags: ["ATS"],
                    job_type: "full_time",
                    publication_date: "2025-01-14T06:50:42",
                    candidate_required_location: "Europe",
                    salary: "",
                  },
                  {
                    id: 1962616,
                    url: "https://remotive.com/remote-jobs/hr/hr-business-partner-1962616",
                    title: "HR Business Partner",
                    company_name: "Octopus",
                    company_logo: "https://remotive.com/job/1962616/logo",
                    category: "Human Resources",
                    tags: [
                      "security",
                      "agile",
                      "project management",
                      "data analysis",
                      "onboarding",
                      "SOLID",
                      "chat",
                      "people operations",
                      "performance management",
                      "REST",
                    ],
                    job_type: "full_time",
                    publication_date: "2025-01-14T06:50:39",
                    candidate_required_location: "Australia",
                    salary: "$120k - $170k aud",
                  },
                  {
                    id: 1962388,
                    url: "https://remotive.com/remote-jobs/finance-legal/manager-accounting-1962388",
                    title: "Manager, Accounting",
                    company_name: "Sensei Ag",
                    company_logo: "https://remotive.com/job/1962388/logo",
                    category: "Finance / Legal",
                    tags: ["accounting"],
                    job_type: "full_time",
                    publication_date: "2025-01-14T06:50:31",
                    candidate_required_location: "USA",
                    salary:
                      "$115,000 - $150,000.00 / year, with a discretionary bonus of up to 10%.",
                  },
                  {
                    id: 1962494,
                    url: "https://remotive.com/remote-jobs/finance-legal/senior-accountant-1962494",
                    title: "Senior Accountant",
                    company_name: "GotPhoto",
                    company_logo: "https://remotive.com/job/1962494/logo",
                    category: "Finance / Legal",
                    tags: ["accounting", "research", "GAAP", "apple"],
                    job_type: "full_time",
                    publication_date: "2025-01-14T06:50:29",
                    candidate_required_location: "Germany",
                    salary: "",
                  },
                  {
                    "id": 1956254,
                    "url": "https://remotive.com/remote-jobs/software-dev/ai-data-leader-1956254",
                    "title": "AI Data Leader",
                    "company_name": "1848 Ventures",
                    "company_logo": "https://remotive.com/job/1956254/logo",
                    "category": "Software Development",
                    "tags": [
                      "data science",
                      "saas",
                      "security",
                      "AI/ML",
                      "mentoring",
                      "retail",
                      "risk management",
                      "computer science",
                      "backbone",
                      "infrastructure",
                      "diversity",
                      "travel"
                    ],
                    "job_type": "full_time",
                    "publication_date": "2024-12-09T22:50:34",
                    "candidate_required_location": "USA",
                    "salary": "competitive salary with benefits"
                  },
                  {
                    "id": 1954323,
                    "url": "https://remotive.com/remote-jobs/all-others/senior-artist-prototyping-1954323",
                    "title": "Senior Artist - Prototyping",
                    "company_name": "ZeptoLab",
                    "company_logo": "https://remotive.com/job/1954323/logo",
                    "category": "All others",
                    "tags": [
                      "unity",
                      "adobe photoshop"
                    ],
                    "job_type": "contract",
                    "publication_date": "2024-12-09T18:51:19",
                    "candidate_required_location": "Europe",
                    "salary": ""
                  },
                  {
                    "id": 1955360,
                    "url": "https://remotive.com/remote-jobs/data/analytics-engineer-1955360",
                    "title": "Analytics Engineer",
                    "company_name": "Firsthand",
                    "company_logo": "https://remotive.com/job/1955360/logo",
                    "category": "Data Analysis",
                    "tags": [
                      "git",
                      "sql",
                      "bash"
                    ],
                    "job_type": "full_time",
                    "publication_date": "2024-12-09T18:51:09",
                    "candidate_required_location": "USA",
                    "salary": "base, equity, and performance bonus potential"
                  },
                  {
                    "id": 1953810,
                    "url": "https://remotive.com/remote-jobs/finance-legal/ssr-finance-operations-analyst-1953810",
                    "title": "SSr Finance & Operations Analyst",
                    "company_name": "Moovx",
                    "company_logo": "https://remotive.com/job/1953810/logo",
                    "category": "Finance / Legal",
                    "tags": [
                      "accounting",
                      "admin",
                      "AWS",
                      "agile",
                      "payroll",
                      "apollo",
                      "insurance"
                    ],
                    "job_type": "full_time",
                    "publication_date": "2024-12-09T16:51:14",
                    "candidate_required_location": "LATAM",
                    "salary": "competitive salaries throughout latam (usd)"
                  },
                  {
                    "id": 1955777,
                    "url": "https://remotive.com/remote-jobs/project-management/senior-implementation-manager-1955777",
                    "title": "Senior Implementation Manager",
                    "company_name": "Abridge",
                    "company_logo": "https://remotive.com/job/1955777/logo",
                    "category": "Project Management",
                    "tags": [
                      "excel",
                      "go",
                      "security",
                      "UI/UX",
                      "AI/ML",
                      "project management",
                      "documentation",
                      "healthcare",
                      "partnerships",
                      "startup",
                      "testing",
                      "diversity",
                      "travel",
                      "insurance"
                    ],
                    "job_type": "full_time",
                    "publication_date": "2024-12-09T16:51:01",
                    "candidate_required_location": "USA",
                    "salary": "equity and benefits included"
                  },]


              }),
          });
        } else {
          reject({ message: "Endpoint não encontrado" });
        }
      }, 1000);
    });
  }

  useEffect(() => {
    fetchMock("/api/exemplo", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Erro na requisição");
      })
      .then((data) => {
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          setFilteredJobs(data.jobs);
        } else {
          setJobs([]);
          setFilteredJobs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Erro ao carregar vagas");
        setLoading(false);
        setJobs([]);
        setFilteredJobs([]);
      });
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    const searchTerm = search.toLowerCase();
    const results = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company_name.toLowerCase().includes(searchTerm) ||
        job.category.toLowerCase().includes(searchTerm) ||
        (job.tags &&
          job.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
    );
    setFilteredJobs(results);
  }, [search, jobs]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <main className="min-h-screen bg-background w-full">
      <div className="relative w-full">
        {/* Header with background pattern */}
        <div className="h-[160px] bg-gradient-to-r from-indigo-600 to-violet-600 w-full relative overflow-hidden">
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">DevJobs Finder</h1>
            <ModeToggle />
          </div>
        </div>
        <div className="p-4 w-full">
          <Input
            placeholder="Buscar por vaga, empresa ou categoria"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            data-testid="search-input"
          />

          {loading ? (
            <p className="text-center py-4">Carregando vagas...</p>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <p className="text-center py-4">Nenhuma vaga encontrada.</p>
          ) : (
            <div
              className="flex flex-col md:grid md:grid-cols-3 gap-4"
              data-testid="job-list"
            >
              {Array.isArray(filteredJobs) &&
                filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {job.company_logo && (
                          <img
                            src={job.company_logo}
                            alt={`Logo ${job.company_name}`}
                            className="w-12 h-12 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold">{job.title}</h2>
                          <p className="text-sm text-gray-500">
                            {job.company_name}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {job.job_type}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {job.category}
                            </span>
                            {job.salary && (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                {job.salary}
                              </span>
                            )}
                          </div>
                          {job.candidate_required_location && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Localização:</span>{" "}
                              {job.candidate_required_location}
                            </p>
                          )}
                          {job.publication_date && (
                            <p className="text-xs text-gray-500 mt-1">
                              Publicado em: {formatDate(job.publication_date)}
                            </p>
                          )}
                          <div className="mt-3">
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button className="mt-2 dark-mode">Ver vaga</Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
