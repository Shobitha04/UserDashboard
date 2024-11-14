import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, Plugin } from 'chart.js';
import './profile.css';

ChartJS.register(ArcElement, Tooltip, Legend);

type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

type Question = {
  id: number;
  title: string;
  language: string;
  level: 'easy' | 'medium' | 'hard';
};

export default function LeetCodeProfile() {
  const [profileData, setProfileData] = useState({
    username: 'Tom Holland',
    tagline: 'Whyamicodingbruh',
    location: 'Paris',
    github: 'TomZend',
    rank: 'Rank 724,190',
    interests: 'Interested in DSA',
    avatarUrl: 'src/assets/Components/UserComponents/spidey.jpg',
  });

  const [activeDays] = useState<{ [key in Month]: number }>({
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  });

  const [questionsData] = useState({
    total: 3352,
    easy: { solved: 11, total: 834 },
    medium: { solved: 10, total: 1753 },
    hard: { solved: 0, total: 765 },
  });

  const [questions] = useState<Question[]>([
    { id: 1, title: 'Question 1', language: 'JavaScript', level: 'easy' },
    { id: 2, title: 'Question 2', language: 'Python', level: 'medium' },
    { id: 3, title: 'Question 3', language: 'JavaScript', level: 'hard' },
    { id: 4, title: 'Question 4', language: 'Python', level: 'easy' },
    { id: 5, title: 'Question 5', language: 'JavaScript', level: 'medium' },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [filterLanguage, setFilterLanguage] = useState<boolean>(false);
  const [filterLevel, setFilterLevel] = useState<boolean>(false);

  const getPercentage = (solved: number, total: number) => (solved / total) * 100;

  const accuracy = getPercentage(
    questionsData.easy.solved + questionsData.medium.solved + questionsData.hard.solved,
    questionsData.easy.total + questionsData.medium.total + questionsData.hard.total
  ).toFixed(2);

  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [questionsData.easy.solved, questionsData.medium.solved, questionsData.hard.solved],
        backgroundColor: ['#5A6ACF', '#2FBFDE', '#FFCF56'],
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.raw + ' solved';
          },
        },
      },
      legend: {
        position: 'top' as const, // Ensure valid position type for the legend
      },
      title: {
        display: false, // Disable default title rendering
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // Optional: Remove border to make it cleaner
      },
    },
  };

  // Custom Plugin for Center Text
  const centerTextPlugin: Plugin = {
    id: 'centerText',
    beforeDraw(chart: any) {
      const { ctx, chartArea } = chart;
      const width = chartArea.right - chartArea.left;
      const height = chartArea.bottom - chartArea.top;
      const fontSize = height / 15; // Further reduce font size for smaller text
      ctx.save();
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = '#000'; // Text color (black)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Display "Accuracy- (number)%"
      ctx.fillText(`Accuracy- ${accuracy}%`, chartArea.left + width / 2, chartArea.top + height / 2);
      ctx.restore();
    },
  };

  // Register the custom plugin globally
  ChartJS.register(centerTextPlugin);

  // Filter questions based on selected language and difficulty level
  const filteredQuestions = questions.filter(
    (question) =>
      (filterLanguage && (selectedLanguage === 'All' || question.language === selectedLanguage)) &&
      (filterLevel && question.level === selectedLevel)
  );

  return (
    <div className="profile-container">
      {/* Profile Header Section */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={profileData.avatarUrl} alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{profileData.username}</h2>
          <p>{profileData.tagline}</p>
          <p>{profileData.location}</p>
          <p>
            <strong>GitHub:</strong> <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer">{profileData.github}</a>
          </p>
          <p className="rank">{profileData.rank}</p>
        </div>
      </div>

      {/* Active Days Grid */}
      <div className="card active-days-card">
        <h3>Active Days</h3>
        <div className="active-days-grid">
          {Object.keys(activeDays).map((month, index) => (
            <div key={index} className="month">
              <h4>{month}</h4>
              <div className="days-grid">
                {Array.from({ length: activeDays[month as keyof typeof activeDays] }).map((_, day) => (
                  <div key={day} className="day-box active"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="card stats-card">
        <h3>Total Solved Questions</h3>
        <div className="question-stats">
          <div className="stat-item">Easy: {questionsData.easy.solved} / {questionsData.easy.total}</div>
          <div className="stat-item">Medium: {questionsData.medium.solved} / {questionsData.medium.total}</div>
          <div className="stat-item">Hard: {questionsData.hard.solved} / {questionsData.hard.total}</div>
        </div>
        <div className="chart-container">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="card questions-card">
        <h3>Solved Questions</h3>
        <div className="filter-controls">
          <div className="filter">
            <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option value="All">All Languages</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value=".NET">.NET</option>
            </select>
            <input
              type="checkbox"
              checked={filterLanguage}
              onChange={() => setFilterLanguage(!filterLanguage)}
            /> Apply Language Filter
          </div>
          <div className="filter">
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value as 'easy' | 'medium' | 'hard')}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <input
              type="checkbox"
              checked={filterLevel}
              onChange={() => setFilterLevel(!filterLevel)}
            /> Apply Level Filter
          </div>
        </div>
        <div className="questions-scroll">
          <ul>
            {filteredQuestions.map((question) => (
              <li key={question.id}>{question.title}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Community Stats, Languages & Skills, and Badges */}
      <div className="right-section">
        <div className="card badge-card">
          <h3>Badges</h3>
          <div className="badges">
            <span className="badge">LeetCode Warrior</span>
            <span className="badge">Coding Ninja</span>
          </div>
        </div>
        <div className="card community-stats-card">
          <h3>Community Stats</h3>
          <p>Reputation: 1500</p>
          <p>Followers: 200</p>
          <p>Following: 180</p>
        </div>
        <div className="card languages-skills-card">
          <h3>Languages & Skills</h3>
          <ul>
            <li>JavaScript</li>
            <li>Python</li>
            <li>React</li>
            <li>Data Structures</li>
            <li>Algorithms</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
