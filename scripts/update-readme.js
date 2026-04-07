#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = path.join(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');
const TOPIC_FOLDERS = ['Arrays', 'Strings', 'LinkedLists', 'Trees', 'Graphs', 'DynamicProgramming', 'Sorting'];

/**
 * Extract metadata from a JavaScript file
 */
function extractMetadata(filePath, topicName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    const metadata = {
      problem: null,
      difficulty: null,
      topic: topicName,
      date: null,
      url: null,
      filePath: filePath.replace(ROOT_DIR + '/', '')
    };

    // Parse JSDoc comments
    for (let line of lines) {
      if (line.includes('@problem')) {
        metadata.problem = line.split('@problem')[1].trim();
      }
      if (line.includes('@difficulty')) {
        metadata.difficulty = line.split('@difficulty')[1].trim();
      }
      if (line.includes('@topic')) {
        metadata.topic = line.split('@topic')[1].trim();
      }
      if (line.includes('@date')) {
        metadata.date = line.split('@date')[1].trim();
      }
      if (line.includes('@url')) {
        metadata.url = line.split('@url')[1].trim();
      }
    }

    // Use file modification date if no date in metadata
    if (!metadata.date) {
      const stats = fs.statSync(filePath);
      metadata.date = stats.mtime.toISOString().split('T')[0];
    }

    return metadata;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Scan all topic folders for problem files
 */
function scanProblems() {
  const problems = [];

  for (const topic of TOPIC_FOLDERS) {
    const topicPath = path.join(ROOT_DIR, topic);
    
    if (!fs.existsSync(topicPath)) {
      continue;
    }

    const files = fs.readdirSync(topicPath);
    
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(topicPath, file);
        const metadata = extractMetadata(filePath, topic);
        
        if (metadata && metadata.problem) {
          problems.push(metadata);
        }
      }
    }
  }

  return problems;
}

/**
 * Calculate statistics
 */
function calculateStats(problems) {
  const stats = {
    total: problems.length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
    streak: calculateStreak(problems),
    byTopic: {}
  };

  // Calculate topic-wise counts
  for (const problem of problems) {
    const topic = problem.topic || 'Uncategorized';
    stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1;
  }

  return stats;
}

/**
 * Calculate current streak (consecutive days with submissions)
 */
function calculateStreak(problems) {
  if (problems.length === 0) return 0;

  // Sort by date descending
  const sortedProblems = [...problems].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Get unique dates
  const uniqueDates = [...new Set(sortedProblems.map(p => p.date))].sort().reverse();
  
  if (uniqueDates.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const dateStr of uniqueDates) {
    const problemDate = new Date(dateStr);
    problemDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate - problemDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak) {
      streak++;
    } else if (diffDays === streak + 1) {
      // Allow one day gap if today has no submission
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Generate progress bar
 */
function generateProgressBar(count, length = 20) {
  const filled = Math.min(count, length);
  const empty = Math.max(0, length - filled);
  return '▓'.repeat(filled) + '░'.repeat(empty);
}

/**
 * Generate stats section
 */
function generateStatsSection(stats, problems) {
  const progressBar = generateProgressBar(Math.floor(stats.total / 5), 20);
  
  return `<!-- STATS_START -->
![Total Problems](https://img.shields.io/badge/Total_Solved-${stats.total}-brightgreen?style=for-the-badge)
![Streak](https://img.shields.io/badge/Current_Streak-${stats.streak}_Days-orange?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow?style=for-the-badge)

**🎯 Progress Tracker:**
\`\`\`
${progressBar} ${stats.total} problems solved
\`\`\`

**📈 Difficulty Breakdown:**
- 🟢 Easy: ${stats.easy}
- 🟡 Medium: ${stats.medium}
- 🔴 Hard: ${stats.hard}
<!-- STATS_END -->`;
}

/**
 * Generate recent activity table
 */
function generateRecentActivity(problems) {
  if (problems.length === 0) {
    return `<!-- RECENT_START -->
| # | Problem | Topic | Difficulty | Date |
|---|---------|-------|------------|------|
| - | No problems solved yet | - | - | - |
<!-- RECENT_END -->`;
  }

  // Sort by date descending
  const recent = [...problems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const rows = recent.map((p, idx) => {
    const problemLink = p.url 
      ? `[${p.problem}](${p.url})` 
      : `[${p.problem}](${p.filePath})`;
    
    const difficultyEmoji = {
      'Easy': '🟢',
      'Medium': '🟡',
      'Hard': '🔴'
    }[p.difficulty] || '⚪';

    return `| ${idx + 1} | ${problemLink} | ${p.topic} | ${difficultyEmoji} ${p.difficulty} | ${p.date} |`;
  }).join('\n');

  return `<!-- RECENT_START -->
| # | Problem | Topic | Difficulty | Date |
|---|---------|-------|------------|------|
${rows}
<!-- RECENT_END -->`;
}

/**
 * Generate topic-wise progress table
 */
function generateTopicProgress(stats) {
  const topicMap = {
    'Arrays': 'Arrays',
    'Strings': 'Strings',
    'LinkedLists': 'Linked Lists',
    'Trees': 'Trees',
    'Graphs': 'Graphs',
    'DynamicProgramming': 'Dynamic Programming',
    'Sorting': 'Sorting & Searching'
  };

  const rows = Object.entries(topicMap).map(([folder, displayName]) => {
    const count = stats.byTopic[folder] || 0;
    const status = count === 0 ? '⚪ Not Started' : count < 5 ? '🟡 Learning' : '🟢 Active';
    return `| ${displayName} | ${count} | ${status} |`;
  }).join('\n');

  return `<!-- TOPICS_START -->
| Topic | Problems Solved | Status |
|:------|:----------------|:-------|
${rows}
<!-- TOPICS_END -->`;
}

/**
 * Update README.md
 */
function updateReadme(problems) {
  let readme = fs.readFileSync(README_PATH, 'utf8');
  const stats = calculateStats(problems);

  // Replace sections
  readme = readme.replace(
    /<!-- STATS_START -->[\s\S]*?<!-- STATS_END -->/,
    generateStatsSection(stats, problems)
  );

  readme = readme.replace(
    /<!-- RECENT_START -->[\s\S]*?<!-- RECENT_END -->/,
    generateRecentActivity(problems)
  );

  readme = readme.replace(
    /<!-- TOPICS_START -->[\s\S]*?<!-- TOPICS_END -->/,
    generateTopicProgress(stats)
  );

  // Update timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  readme = readme.replace(
    /<!-- TIMESTAMP -->[\s\S]*?<!-- TIMESTAMP_END -->/,
    `<!-- TIMESTAMP -->${timestamp}<!-- TIMESTAMP_END -->`
  );

  fs.writeFileSync(README_PATH, readme, 'utf8');
  
  console.log('✅ README.md updated successfully!');
  console.log(`📊 Stats: ${stats.total} total | ${stats.easy} easy | ${stats.medium} medium | ${stats.hard} hard`);
  console.log(`🔥 Streak: ${stats.streak} days`);
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Scanning for problem files...');
  const problems = scanProblems();
  
  console.log(`📁 Found ${problems.length} problem(s)`);
  
  console.log('📝 Updating README.md...');
  updateReadme(problems);
}

// Run the script
main();
