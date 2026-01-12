import { Agent, Category, AgentCategoryId } from '@/types/agent';

// ============================================================================
// CATEGORIES
// ============================================================================

export const categories: Category[] = [
  {
    id: 'code-quality',
    name: 'Code Quality & Review',
    shortName: 'Quality',
    description: 'Code review, standards compliance, and security scanning',
    icon: 'ShieldCheck',
    color: '#0090B5',
  },
  {
    id: 'testing',
    name: 'Testing & Quality Assurance',
    shortName: 'Testing',
    description: 'Test generation, coverage analysis, and bug reproduction',
    icon: 'FlaskConical',
    color: '#10B981',
  },
  {
    id: 'documentation',
    name: 'Documentation & Technical Writing',
    shortName: 'Docs',
    description: 'Technical documentation, API docs, and release notes',
    icon: 'FileText',
    color: '#F59E0B',
  },
  {
    id: 'dev-productivity',
    name: 'Development Productivity',
    shortName: 'Dev Tools',
    description: 'Boilerplate generation, refactoring, and code scaffolding',
    icon: 'Zap',
    color: '#A855F7',
  },
  {
    id: 'devops',
    name: 'DevOps & Deployment',
    shortName: 'DevOps',
    description: 'CI/CD pipelines, deployment checklists, and environment management',
    icon: 'Rocket',
    color: '#EF4444',
  },
  {
    id: 'requirements',
    name: 'Requirements & Analysis',
    shortName: 'Analysis',
    description: 'BRD analysis, effort estimation, and gap analysis',
    icon: 'Target',
    color: '#EC4899',
  },
  {
    id: 'event-management',
    name: 'Event/Ticket Management',
    shortName: 'Events',
    description: 'Event summarisation, dependency mapping, and handovers',
    icon: 'Ticket',
    color: '#06B6D4',
  },
  {
    id: 'syspro-specific',
    name: 'SYSPRO-Specific',
    shortName: 'SYSPRO',
    description: 'Business objects, transaction flows, and setup advisors',
    icon: 'Database',
    color: '#3B82F6',
  },
  {
    id: 'team-process',
    name: 'Team & Process',
    shortName: 'Team',
    description: 'Sprint summaries, onboarding, and capacity planning',
    icon: 'Users',
    color: '#8B5CF6',
  },
  {
    id: 'customer-support',
    name: 'Customer & Support',
    shortName: 'Support',
    description: 'Customer communications, training materials, and FAQs',
    icon: 'HeadphonesIcon',
    color: '#14B8A6',
  },
];

// ============================================================================
// AGENTS
// ============================================================================

export const agents: Agent[] = [
  // ==========================================================================
  // CODE QUALITY & REVIEW (7 agents)
  // ==========================================================================
  {
    id: 'code-reviewer',
    name: 'Code Reviewer Agent',
    shortName: 'Code Review',
    description: 'Performs automated code review against coding standards, identifies issues, and provides improvement suggestions.',
    icon: 'SearchCode',
    categoryId: 'code-quality',
    webhookUrl: '/webhook/agent-code-reviewer',
    outputType: 'mixed',
    inputs: [
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: true, placeholder: 'e.g., SORTOI, INVMQI', description: 'One or more program names' },
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: true, placeholder: 'e.g., EVT-12345' },
      { name: 'credentials', label: 'e.Net Login Credentials', type: 'text', required: true, placeholder: 'Username/environment' },
      { name: 'focusAreas', label: 'Review Focus Areas', type: 'multi-select', required: false, options: [
        { value: 'performance', label: 'Performance' },
        { value: 'standards', label: 'Coding Standards' },
        { value: 'security', label: 'Security' },
        { value: 'maintainability', label: 'Maintainability' },
      ]},
    ],
  },
  {
    id: 'cobol-standards',
    name: 'COBOL Standards Compliance Agent',
    shortName: 'COBOL Standards',
    description: 'Ensures COBOL programs follow internal standards for naming conventions, copybook usage, transaction handling, and structure.',
    icon: 'FileCode',
    categoryId: 'code-quality',
    webhookUrl: '/webhook/agent-cobol-standards',
    outputType: 'markdown',
    inputs: [
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: true, placeholder: 'e.g., SORTOI' },
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: false, placeholder: 'For context from dev notes' },
      { name: 'standardsToCheck', label: 'Standards to Check', type: 'select', required: false, options: [
        { value: 'all', label: 'All Standards' },
        { value: 'naming', label: 'Naming Conventions' },
        { value: 'copybook', label: 'Copybook Usage' },
        { value: 'transaction', label: 'Transaction Handling' },
        { value: 'structure', label: 'Code Structure' },
      ]},
    ],
  },
  {
    id: 'sql-optimizer',
    name: 'SQL Query Optimiser Agent',
    shortName: 'SQL Optimizer',
    description: 'Analyses embedded SQL for performance issues, suggests index usage, identifies inefficient patterns like N+1 queries.',
    icon: 'Database',
    categoryId: 'code-quality',
    webhookUrl: '/webhook/agent-sql-optimizer',
    outputType: 'mixed',
    inputs: [
      { name: 'programNamesOrSql', label: 'Program Name(s) or SQL', type: 'textarea', required: true, placeholder: 'Enter program names or paste raw SQL', rows: 4 },
      { name: 'dbEnvironment', label: 'Database Environment', type: 'select', required: false, options: [
        { value: 'dev', label: 'Development' },
        { value: 'test', label: 'Test' },
        { value: 'prod', label: 'Production' },
      ]},
      { name: 'targetTables', label: 'Target Tables to Focus On', type: 'text', required: false, placeholder: 'e.g., InvMaster, SorMaster' },
    ],
  },
  {
    id: 'xml-validator',
    name: 'XML Schema Validator Agent',
    shortName: 'XML Validator',
    description: 'Validates XML structures in programs against e.Net schemas, catches mismatches before runtime failures.',
    icon: 'FileCode2',
    categoryId: 'code-quality',
    webhookUrl: '/webhook/agent-xml-validator',
    outputType: 'markdown',
    inputs: [
      { name: 'programOrPath', label: 'Program Name or XML File Path', type: 'text', required: true, placeholder: 'e.g., SORTOI or /path/to/file.xml' },
      { name: 'schemaVersion', label: 'Schema Name/Version', type: 'text', required: true, placeholder: 'e.g., SalesOrder_v2.0' },
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: false },
    ],
  },
  {
    id: 'dead-code-detector',
    name: 'Dead Code Detector Agent',
    shortName: 'Dead Code',
    description: 'Identifies unreachable code blocks, unused variables, and orphaned subroutines to reduce maintenance burden.',
    icon: 'Trash2',
    categoryId: 'code-quality',
    webhookUrl: '/webhook/agent-dead-code',
    outputType: 'markdown',
    inputs: [
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: true, placeholder: 'e.g., SORTOI, INVMQI' },
      { name: 'includeCopybooks', label: 'Include Copybook Analysis', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
      { name: 'scanDepth', label: 'Scan Depth', type: 'select', required: false, options: [
        { value: 'single', label: 'Single Program' },
        { value: 'called', label: 'Include Called Programs' },
      ]},
    ],
  },
  {
    id: 'security-scanner',
    name: 'Security Vulnerability Scanner Agent',
    shortName: 'Security Scan',
    description: 'Scans code for common vulnerabilities like SQL injection, improper input validation, and hardcoded credentials.',
    icon: 'Shield',
    categoryId: 'code-quality',
    webhookUrl: '/webhook/agent-security-scanner',
    outputType: 'mixed',
    inputs: [
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: true, placeholder: 'e.g., SORTOI' },
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: false },
      { name: 'vulnerabilityTypes', label: 'Vulnerability Types', type: 'multi-select', required: false, options: [
        { value: 'all', label: 'All Types' },
        { value: 'sql-injection', label: 'SQL Injection' },
        { value: 'xss', label: 'XSS' },
        { value: 'hardcoded-creds', label: 'Hardcoded Credentials' },
        { value: 'input-validation', label: 'Input Validation' },
      ]},
    ],
  },
  {
    id: 'impact-analyser',
    name: 'Cross-Program Impact Analyser Agent',
    shortName: 'Impact Analysis',
    description: 'Maps all programs, copybooks, and business objects affected by a change to prevent unintended side effects.',
    icon: 'GitBranch',
    categoryId: 'code-quality',
    webhookUrl: '/webhook/agent-impact-analyser',
    outputType: 'mixed',
    inputs: [
      { name: 'programName', label: 'Program Being Changed', type: 'text', required: true, placeholder: 'e.g., SORTOI' },
      { name: 'changeDescription', label: 'Change Description or Event Number', type: 'textarea', required: true, rows: 3 },
      { name: 'analysisDepth', label: 'Depth of Analysis', type: 'select', required: false, options: [
        { value: 'direct', label: 'Direct Dependencies' },
        { value: 'cascade', label: 'Full Cascade' },
      ]},
    ],
  },

  // ==========================================================================
  // TESTING & QA (7 agents)
  // ==========================================================================
  {
    id: 'jenkins-test',
    name: 'Jenkins Test Creator Agent',
    shortName: 'Jenkins Test',
    description: 'Generates automated Jenkins test scripts using e.Net Business Object APIs based on program functionality.',
    icon: 'FlaskConical',
    categoryId: 'testing',
    webhookUrl: '/webhook/agent-jenkins-test',
    outputType: 'code',
    inputs: [
      { name: 'programName', label: 'Program Name', type: 'text', required: true, placeholder: 'e.g., SORTOI' },
      { name: 'credentials', label: 'e.Net Login Credentials', type: 'text', required: true },
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: true, placeholder: 'e.g., EVT-12345' },
      { name: 'instructions', label: 'Additional Context/Instructions', type: 'textarea', required: false, rows: 4 },
    ],
  },
  {
    id: 'playwright-test',
    name: 'Playwright Test Generator Agent',
    shortName: 'Playwright',
    description: 'Creates end-to-end UI tests for SYSPRO Web workflows, automating browser-based regression testing.',
    icon: 'MonitorPlay',
    categoryId: 'testing',
    webhookUrl: '/webhook/agent-playwright-test',
    outputType: 'code',
    inputs: [
      { name: 'featureName', label: 'Feature/Workflow Name', type: 'text', required: true },
      { name: 'webUrl', label: 'SYSPRO Web UI URL', type: 'text', required: true, placeholder: 'https://syspro.example.com' },
      { name: 'credentials', label: 'User Credentials for Test', type: 'text', required: true },
      { name: 'specOrEvent', label: 'Functional Spec or Event Number', type: 'textarea', required: true, rows: 3 },
      { name: 'browsers', label: 'Browser Targets', type: 'multi-select', required: false, options: [
        { value: 'chrome', label: 'Chrome' },
        { value: 'firefox', label: 'Firefox' },
        { value: 'edge', label: 'Edge' },
      ]},
    ],
  },
  {
    id: 'test-case-generator',
    name: 'Test Case Generator Agent',
    shortName: 'Test Cases',
    description: 'Converts business requirements into structured test cases with steps, expected results, and acceptance criteria.',
    icon: 'ClipboardCheck',
    categoryId: 'testing',
    webhookUrl: '/webhook/agent-test-case',
    outputType: 'markdown',
    inputs: [
      { name: 'brdOrEvent', label: 'BRD Document or Event Number', type: 'textarea', required: true, rows: 4, placeholder: 'Paste BRD content or enter event number' },
      { name: 'testType', label: 'Test Type', type: 'select', required: false, options: [
        { value: 'functional', label: 'Functional' },
        { value: 'integration', label: 'Integration' },
        { value: 'regression', label: 'Regression' },
        { value: 'uat', label: 'UAT' },
      ]},
      { name: 'outputFormat', label: 'Output Format', type: 'select', required: false, options: [
        { value: 'azure-devops', label: 'Azure DevOps' },
        { value: 'excel', label: 'Excel' },
        { value: 'markdown', label: 'Plain Text/Markdown' },
      ]},
    ],
  },
  {
    id: 'regression-selector',
    name: 'Regression Test Selector Agent',
    shortName: 'Regression',
    description: 'Intelligently recommends which existing tests need re-running based on code changes.',
    icon: 'ListChecks',
    categoryId: 'testing',
    webhookUrl: '/webhook/agent-regression-selector',
    outputType: 'markdown',
    inputs: [
      { name: 'programNames', label: 'Program Name(s) Changed', type: 'text', required: true },
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: false },
      { name: 'changeSummary', label: 'Change Summary', type: 'textarea', required: false, rows: 3 },
    ],
  },
  {
    id: 'test-data-generator',
    name: 'Test Data Generator Agent',
    shortName: 'Test Data',
    description: 'Creates realistic, valid test data sets that respect SYSPRO business rules and referential integrity.',
    icon: 'Table',
    categoryId: 'testing',
    webhookUrl: '/webhook/agent-test-data',
    outputType: 'file',
    inputs: [
      { name: 'dataType', label: 'Data Type Needed', type: 'select', required: true, options: [
        { value: 'customers', label: 'Customers' },
        { value: 'stock-codes', label: 'Stock Codes' },
        { value: 'sales-orders', label: 'Sales Orders' },
        { value: 'purchase-orders', label: 'Purchase Orders' },
        { value: 'suppliers', label: 'Suppliers' },
      ]},
      { name: 'quantity', label: 'Quantity of Records', type: 'number', required: true, placeholder: 'e.g., 100' },
      { name: 'constraints', label: 'Data Constraints/Rules', type: 'textarea', required: false, rows: 3, placeholder: 'e.g., customers in region X' },
      { name: 'targetEnvironment', label: 'Target Environment', type: 'text', required: false },
    ],
  },
  {
    id: 'test-coverage',
    name: 'Test Coverage Analyser Agent',
    shortName: 'Coverage',
    description: 'Maps existing tests to program functionality, identifies untested code paths and coverage gaps.',
    icon: 'PieChart',
    categoryId: 'testing',
    webhookUrl: '/webhook/agent-test-coverage',
    outputType: 'mixed',
    inputs: [
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: true },
      { name: 'testSuiteId', label: 'Test Suite Location/Identifier', type: 'text', required: true },
      { name: 'coverageType', label: 'Coverage Type', type: 'select', required: false, options: [
        { value: 'line', label: 'Line Coverage' },
        { value: 'branch', label: 'Branch Coverage' },
        { value: 'functional', label: 'Functional Coverage' },
      ]},
    ],
  },
  {
    id: 'bug-reproduction',
    name: 'Bug Reproduction Agent',
    shortName: 'Bug Repro',
    description: 'Analyses support tickets and related code to identify likely root cause and reproduction steps.',
    icon: 'Bug',
    categoryId: 'testing',
    webhookUrl: '/webhook/agent-bug-reproduction',
    outputType: 'mixed',
    inputs: [
      { name: 'eventNumber', label: 'Event Number (Support Ticket)', type: 'text', required: true, placeholder: 'e.g., SUP-12345' },
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: false, placeholder: 'Can be derived from Errtrk' },
      { name: 'environment', label: 'Environment Where Bug Occurred', type: 'text', required: false },
    ],
  },

  // ==========================================================================
  // DOCUMENTATION & TECHNICAL WRITING (7 agents)
  // ==========================================================================
  {
    id: 'technical-author',
    name: 'Technical Author Agent',
    shortName: 'Tech Author',
    description: 'Creates end-user help documentation from business and technical specifications for new programs.',
    icon: 'FileText',
    categoryId: 'documentation',
    webhookUrl: '/webhook/agent-technical-author',
    outputType: 'markdown',
    inputs: [
      { name: 'programName', label: 'Program Name', type: 'text', required: true },
      { name: 'businessSpec', label: 'Business Specification', type: 'textarea', required: true, rows: 4 },
      { name: 'technicalSpec', label: 'Technical Specification', type: 'textarea', required: true, rows: 4 },
      { name: 'outputFormat', label: 'Output Format', type: 'select', required: false, options: [
        { value: 'markdown', label: 'Markdown' },
        { value: 'word', label: 'Word' },
        { value: 'html', label: 'HTML' },
      ]},
    ],
  },
  {
    id: 'code-documentation',
    name: 'Code Documentation Agent',
    shortName: 'Code Docs',
    description: 'Generates meaningful inline comments and header documentation for undocumented or legacy programs.',
    icon: 'MessageSquareCode',
    categoryId: 'documentation',
    webhookUrl: '/webhook/agent-code-documentation',
    outputType: 'code',
    inputs: [
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: true },
      { name: 'docStyle', label: 'Documentation Style', type: 'select', required: false, options: [
        { value: 'inline', label: 'Inline Comments' },
        { value: 'header', label: 'Header Blocks' },
        { value: 'both', label: 'Both' },
      ]},
      { name: 'detailLevel', label: 'Detail Level', type: 'select', required: false, options: [
        { value: 'minimal', label: 'Minimal' },
        { value: 'standard', label: 'Standard' },
        { value: 'verbose', label: 'Verbose' },
      ]},
    ],
  },
  {
    id: 'api-documentation',
    name: 'API Documentation Agent',
    shortName: 'API Docs',
    description: 'Creates comprehensive e.Net Business Object documentation with endpoints, parameters, and examples.',
    icon: 'BookOpen',
    categoryId: 'documentation',
    webhookUrl: '/webhook/agent-api-documentation',
    outputType: 'markdown',
    inputs: [
      { name: 'businessObjectNames', label: 'Business Object Name(s)', type: 'text', required: true, placeholder: 'e.g., SorMaster, InvMaster' },
      { name: 'includeSamples', label: 'Include Sample Payloads', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
      { name: 'outputFormat', label: 'Output Format', type: 'select', required: false, options: [
        { value: 'markdown', label: 'Markdown' },
        { value: 'html', label: 'HTML' },
        { value: 'openapi', label: 'OpenAPI Spec' },
      ]},
    ],
  },
  {
    id: 'release-notes',
    name: 'Release Notes Generator Agent',
    shortName: 'Release Notes',
    description: 'Compiles completed events into polished release notes for internal teams or customers.',
    icon: 'ScrollText',
    categoryId: 'documentation',
    webhookUrl: '/webhook/agent-release-notes',
    outputType: 'markdown',
    inputs: [
      { name: 'releaseVersion', label: 'Release Version/Identifier', type: 'text', required: true },
      { name: 'eventNumbers', label: 'Event Numbers or Date Range', type: 'textarea', required: true, rows: 3, placeholder: 'e.g., EVT-123, EVT-124 or 2024-01-01 to 2024-01-31' },
      { name: 'audience', label: 'Audience', type: 'select', required: false, options: [
        { value: 'internal', label: 'Internal' },
        { value: 'customer', label: 'Customer-Facing' },
        { value: 'both', label: 'Both' },
      ]},
      { name: 'includeTechnical', label: 'Include Technical Details', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'change-log',
    name: 'Change Log Agent',
    shortName: 'Change Log',
    description: 'Generates internal technical change logs from Errtrk development notes for audit and reference.',
    icon: 'History',
    categoryId: 'documentation',
    webhookUrl: '/webhook/agent-change-log',
    outputType: 'markdown',
    inputs: [
      { name: 'eventOrDateRange', label: 'Event Number(s) or Date Range', type: 'textarea', required: true, rows: 2 },
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: false },
      { name: 'detailLevel', label: 'Detail Level', type: 'select', required: false, options: [
        { value: 'summary', label: 'Summary' },
        { value: 'detailed', label: 'Detailed' },
      ]},
    ],
  },
  {
    id: 'kb-article',
    name: 'Knowledge Base Article Agent',
    shortName: 'KB Article',
    description: 'Transforms resolved support tickets into searchable knowledge base articles.',
    icon: 'Lightbulb',
    categoryId: 'documentation',
    webhookUrl: '/webhook/agent-kb-article',
    outputType: 'markdown',
    inputs: [
      { name: 'eventNumber', label: 'Event Number (Resolved Ticket)', type: 'text', required: true },
      { name: 'targetAudience', label: 'Target Audience', type: 'select', required: false, options: [
        { value: 'end-user', label: 'End User' },
        { value: 'admin', label: 'Administrator' },
        { value: 'developer', label: 'Developer' },
      ]},
      { name: 'relatedArticles', label: 'Related KB Articles to Link', type: 'text', required: false },
    ],
  },
  {
    id: 'runbook-generator',
    name: 'Runbook Generator Agent',
    shortName: 'Runbook',
    description: 'Creates step-by-step operational procedures for deployments, rollbacks, and incident response.',
    icon: 'ClipboardList',
    categoryId: 'documentation',
    webhookUrl: '/webhook/agent-runbook',
    outputType: 'markdown',
    inputs: [
      { name: 'processName', label: 'Process Name', type: 'select', required: true, options: [
        { value: 'deployment', label: 'Deployment' },
        { value: 'rollback', label: 'Rollback' },
        { value: 'incident', label: 'Incident Response' },
      ]},
      { name: 'moduleScope', label: 'Program/Module Scope', type: 'text', required: true },
      { name: 'environments', label: 'Environment(s)', type: 'text', required: true, placeholder: 'e.g., DEV, TEST, PROD' },
      { name: 'includeRollback', label: 'Include Rollback Steps', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },

  // ==========================================================================
  // DEVELOPMENT PRODUCTIVITY (6 agents)
  // ==========================================================================
  {
    id: 'boilerplate-generator',
    name: 'Boilerplate Generator Agent',
    shortName: 'Boilerplate',
    description: 'Creates starter templates for new programs following internal structure and standards.',
    icon: 'FileCode',
    categoryId: 'dev-productivity',
    webhookUrl: '/webhook/agent-boilerplate',
    outputType: 'code',
    inputs: [
      { name: 'programType', label: 'Program Type', type: 'select', required: true, options: [
        { value: 'cobol', label: 'COBOL' },
        { value: 'dialog', label: 'Dialog' },
        { value: 'csharp', label: 'C# Class' },
        { value: 'html', label: 'HTML Form' },
      ]},
      { name: 'programName', label: 'Program Name', type: 'text', required: true },
      { name: 'sysproModule', label: 'SYSPRO Module', type: 'select', required: false, options: [
        { value: 'sor', label: 'SOR (Sales Orders)' },
        { value: 'inv', label: 'INV (Inventory)' },
        { value: 'wip', label: 'WIP (Work in Progress)' },
        { value: 'pur', label: 'PUR (Purchasing)' },
        { value: 'gl', label: 'GL (General Ledger)' },
      ]},
      { name: 'description', label: 'Brief Functional Description', type: 'textarea', required: false, rows: 2 },
    ],
  },
  {
    id: 'copybook-generator',
    name: 'Copybook Generator Agent',
    shortName: 'Copybook',
    description: 'Automatically generates COBOL copybooks from database tables or XML schemas.',
    icon: 'Copy',
    categoryId: 'dev-productivity',
    webhookUrl: '/webhook/agent-copybook',
    outputType: 'code',
    inputs: [
      { name: 'sourceType', label: 'Source Type', type: 'select', required: true, options: [
        { value: 'database', label: 'Database Table' },
        { value: 'xml-schema', label: 'XML Schema' },
        { value: 'manual', label: 'Manual Definition' },
      ]},
      { name: 'sourceName', label: 'Source Name (Table/Schema Path)', type: 'text', required: true },
      { name: 'copybookName', label: 'Copybook Name', type: 'text', required: true },
      { name: 'includeComments', label: 'Include Documentation Comments', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'enet-wrapper',
    name: 'e.Net Wrapper Generator Agent',
    shortName: 'e.Net Wrapper',
    description: 'Creates type-safe C# wrapper classes for Business Object API calls.',
    icon: 'Package',
    categoryId: 'dev-productivity',
    webhookUrl: '/webhook/agent-enet-wrapper',
    outputType: 'code',
    inputs: [
      { name: 'businessObjectNames', label: 'Business Object Name(s)', type: 'text', required: true },
      { name: 'operations', label: 'Operations to Wrap', type: 'multi-select', required: true, options: [
        { value: 'query', label: 'Query' },
        { value: 'add', label: 'Add' },
        { value: 'update', label: 'Update' },
        { value: 'delete', label: 'Delete' },
        { value: 'all', label: 'All' },
      ]},
      { name: 'namespace', label: 'Namespace', type: 'text', required: false, placeholder: 'e.g., SYSPRO.Wrappers' },
    ],
  },
  {
    id: 'sql-script-generator',
    name: 'SQL Script Generator Agent',
    shortName: 'SQL Scripts',
    description: 'Generates SQL scripts for schema changes, data migrations, or complex queries.',
    icon: 'FileJson',
    categoryId: 'dev-productivity',
    webhookUrl: '/webhook/agent-sql-script',
    outputType: 'code',
    inputs: [
      { name: 'scriptType', label: 'Script Type', type: 'select', required: true, options: [
        { value: 'ddl', label: 'DDL (Schema Changes)' },
        { value: 'migration', label: 'Data Migration' },
        { value: 'report', label: 'Report Query' },
        { value: 'data-fix', label: 'Data Fix' },
      ]},
      { name: 'tables', label: 'Table(s) Involved', type: 'text', required: true },
      { name: 'requirements', label: 'Requirements Description', type: 'textarea', required: true, rows: 4 },
      { name: 'dbVersion', label: 'Target Database Version', type: 'text', required: false },
    ],
  },
  {
    id: 'config-migration',
    name: 'Config Migration Agent',
    shortName: 'Config Migrate',
    description: 'Compares and migrates configuration settings between environments.',
    icon: 'Settings',
    categoryId: 'dev-productivity',
    webhookUrl: '/webhook/agent-config-migration',
    outputType: 'mixed',
    inputs: [
      { name: 'sourceEnvironment', label: 'Source Environment', type: 'text', required: true },
      { name: 'targetEnvironment', label: 'Target Environment', type: 'text', required: true },
      { name: 'configScope', label: 'Config Scope', type: 'select', required: false, options: [
        { value: 'full', label: 'Full' },
        { value: 'module', label: 'Specific Module' },
        { value: 'settings', label: 'Specific Settings' },
      ]},
      { name: 'dryRun', label: 'Dry Run Only', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'refactoring-assistant',
    name: 'Refactoring Assistant Agent',
    shortName: 'Refactor',
    description: 'Suggests and implements safe code refactoring like extracting subroutines or consolidating logic.',
    icon: 'Wand2',
    categoryId: 'dev-productivity',
    webhookUrl: '/webhook/agent-refactoring',
    outputType: 'code',
    inputs: [
      { name: 'programName', label: 'Program Name', type: 'text', required: true },
      { name: 'refactoringType', label: 'Refactoring Type', type: 'select', required: true, options: [
        { value: 'extract', label: 'Extract Subroutine' },
        { value: 'rename', label: 'Rename' },
        { value: 'consolidate', label: 'Consolidate Duplicate' },
        { value: 'modernise', label: 'Modernise' },
      ]},
      { name: 'codeSection', label: 'Specific Code Section', type: 'text', required: false, placeholder: 'Line numbers or subroutine name' },
      { name: 'eventNumber', label: 'Event Number for Context', type: 'text', required: false },
    ],
  },

  // ==========================================================================
  // DEVOPS & DEPLOYMENT (5 agents)
  // ==========================================================================
  {
    id: 'deployment-checklist',
    name: 'Deployment Checklist Generator Agent',
    shortName: 'Deploy Checklist',
    description: 'Creates comprehensive deployment checklists from events, ensuring nothing is missed.',
    icon: 'CheckSquare',
    categoryId: 'devops',
    webhookUrl: '/webhook/agent-deployment-checklist',
    outputType: 'markdown',
    inputs: [
      { name: 'eventNumbers', label: 'Event Number(s) to Deploy', type: 'textarea', required: true, rows: 2 },
      { name: 'targetEnvironment', label: 'Target Environment', type: 'text', required: true },
      { name: 'deploymentDate', label: 'Deployment Date/Window', type: 'text', required: false },
      { name: 'includeSignoff', label: 'Include Sign-off Sections', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'environment-diff',
    name: 'Environment Diff Agent',
    shortName: 'Env Diff',
    description: 'Compares program versions across environments to identify discrepancies.',
    icon: 'GitCompare',
    categoryId: 'devops',
    webhookUrl: '/webhook/agent-environment-diff',
    outputType: 'mixed',
    inputs: [
      { name: 'sourceEnvironment', label: 'Source Environment', type: 'text', required: true },
      { name: 'targetEnvironment', label: 'Target Environment', type: 'text', required: true },
      { name: 'scope', label: 'Scope', type: 'select', required: false, options: [
        { value: 'all', label: 'All Programs' },
        { value: 'module', label: 'Specific Module' },
        { value: 'list', label: 'Specific Program List' },
      ]},
    ],
  },
  {
    id: 'jenkins-pipeline',
    name: 'Jenkins Pipeline Generator Agent',
    shortName: 'CI/CD Pipeline',
    description: 'Creates or updates Jenkins pipeline definitions for CI/CD automation.',
    icon: 'Workflow',
    categoryId: 'devops',
    webhookUrl: '/webhook/agent-jenkins-pipeline',
    outputType: 'code',
    inputs: [
      { name: 'programNames', label: 'Program Name(s)', type: 'text', required: true },
      { name: 'pipelineType', label: 'Pipeline Type', type: 'select', required: true, options: [
        { value: 'build', label: 'Build Only' },
        { value: 'test', label: 'Test Only' },
        { value: 'deploy', label: 'Deploy Only' },
        { value: 'full', label: 'Full CI/CD' },
      ]},
      { name: 'targetEnvironments', label: 'Target Environments', type: 'text', required: false },
      { name: 'notifications', label: 'Notification Recipients', type: 'text', required: false },
    ],
  },
  {
    id: 'rollback-plan',
    name: 'Rollback Plan Generator Agent',
    shortName: 'Rollback Plan',
    description: 'Creates detailed rollback procedures and scripts before deployments.',
    icon: 'Undo2',
    categoryId: 'devops',
    webhookUrl: '/webhook/agent-rollback-plan',
    outputType: 'markdown',
    inputs: [
      { name: 'eventOrDeployment', label: 'Event Number(s) or Deployment ID', type: 'text', required: true },
      { name: 'environment', label: 'Environment', type: 'text', required: true },
      { name: 'includeDbRollback', label: 'Include Database Rollback Scripts', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'build-failure-analyst',
    name: 'Build Failure Analyst Agent',
    shortName: 'Build Analyst',
    description: 'Analyses Jenkins build failures, identifies root cause, and suggests fixes.',
    icon: 'AlertTriangle',
    categoryId: 'devops',
    webhookUrl: '/webhook/agent-build-failure',
    outputType: 'mixed',
    inputs: [
      { name: 'buildNumber', label: 'Jenkins Build Number or URL', type: 'text', required: true },
      { name: 'buildLog', label: 'Build Log (if not auto-fetched)', type: 'textarea', required: false, rows: 6 },
      { name: 'recentChanges', label: 'Recent Changes Context', type: 'textarea', required: false, rows: 3 },
    ],
  },

  // ==========================================================================
  // REQUIREMENTS & ANALYSIS (5 agents)
  // ==========================================================================
  {
    id: 'brd-analyser',
    name: 'BRD Analyser Agent',
    shortName: 'BRD Analysis',
    description: 'Reviews Business Requirements Documents for completeness, ambiguity, and testability.',
    icon: 'FileSearch',
    categoryId: 'requirements',
    webhookUrl: '/webhook/agent-brd-analyser',
    outputType: 'markdown',
    inputs: [
      { name: 'brdDocument', label: 'BRD Document (Upload or Path)', type: 'file', required: true, accept: '.pdf,.doc,.docx,.txt,.md' },
      { name: 'analysisFocus', label: 'Analysis Focus', type: 'multi-select', required: false, options: [
        { value: 'completeness', label: 'Completeness' },
        { value: 'clarity', label: 'Clarity' },
        { value: 'testability', label: 'Testability' },
        { value: 'all', label: 'All' },
      ]},
      { name: 'checklistTemplate', label: 'Checklist Template to Use', type: 'text', required: false },
    ],
  },
  {
    id: 'tech-spec-generator',
    name: 'Technical Spec Generator Agent',
    shortName: 'Tech Spec',
    description: 'Transforms business requirements into detailed technical specifications.',
    icon: 'FileCode',
    categoryId: 'requirements',
    webhookUrl: '/webhook/agent-tech-spec',
    outputType: 'markdown',
    inputs: [
      { name: 'brdOrEvent', label: 'BRD Document or Event Number', type: 'textarea', required: true, rows: 4 },
      { name: 'targetModules', label: 'Target SYSPRO Modules', type: 'text', required: false },
      { name: 'includeEffort', label: 'Include Effort Estimates', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
      { name: 'template', label: 'Template to Follow', type: 'text', required: false },
    ],
  },
  {
    id: 'effort-estimator',
    name: 'Effort Estimator Agent',
    shortName: 'Estimator',
    description: 'Provides development effort estimates based on requirements complexity.',
    icon: 'Clock',
    categoryId: 'requirements',
    webhookUrl: '/webhook/agent-effort-estimator',
    outputType: 'markdown',
    inputs: [
      { name: 'requirements', label: 'Requirements (Doc/Event/Text)', type: 'textarea', required: true, rows: 4 },
      { name: 'estimationUnit', label: 'Estimation Unit', type: 'select', required: false, options: [
        { value: 'hours', label: 'Hours' },
        { value: 'days', label: 'Days' },
        { value: 'story-points', label: 'Story Points' },
      ]},
      { name: 'complexityFactors', label: 'Complexity Factors', type: 'textarea', required: false, rows: 2 },
      { name: 'historicalEvents', label: 'Historical Reference Events', type: 'text', required: false },
    ],
  },
  {
    id: 'traceability',
    name: 'Requirement Traceability Agent',
    shortName: 'Traceability',
    description: 'Creates traceability matrices linking requirements to test cases and code.',
    icon: 'Link',
    categoryId: 'requirements',
    webhookUrl: '/webhook/agent-traceability',
    outputType: 'mixed',
    inputs: [
      { name: 'requirementsSource', label: 'BRD/Requirements Source', type: 'textarea', required: true, rows: 3 },
      { name: 'testCaseSource', label: 'Test Case Source', type: 'text', required: true },
      { name: 'codeMapping', label: 'Code/Program Mapping', type: 'text', required: false },
      { name: 'outputFormat', label: 'Output Format', type: 'select', required: false, options: [
        { value: 'matrix', label: 'Matrix' },
        { value: 'report', label: 'Report' },
      ]},
    ],
  },
  {
    id: 'gap-analysis',
    name: 'Gap Analysis Agent',
    shortName: 'Gap Analysis',
    description: 'Compares requested functionality against current SYSPRO capabilities.',
    icon: 'Target',
    categoryId: 'requirements',
    webhookUrl: '/webhook/agent-gap-analysis',
    outputType: 'markdown',
    inputs: [
      { name: 'requestedFunctionality', label: 'Requested Functionality', type: 'textarea', required: true, rows: 4 },
      { name: 'sysproVersion', label: 'Current SYSPRO Version', type: 'text', required: true },
      { name: 'modulesInScope', label: 'Modules in Scope', type: 'text', required: false },
      { name: 'includeEffort', label: 'Include Effort Estimates', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },

  // ==========================================================================
  // EVENT/TICKET MANAGEMENT (5 agents)
  // ==========================================================================
  {
    id: 'event-summariser',
    name: 'Event Summariser Agent',
    shortName: 'Event Summary',
    description: 'Creates concise summaries of complex events with long histories.',
    icon: 'FileText',
    categoryId: 'event-management',
    webhookUrl: '/webhook/agent-event-summariser',
    outputType: 'markdown',
    inputs: [
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: true },
      { name: 'summaryDepth', label: 'Summary Depth', type: 'select', required: false, options: [
        { value: 'executive', label: 'Executive' },
        { value: 'detailed', label: 'Detailed' },
        { value: 'full', label: 'Full History' },
      ]},
      { name: 'includeAttachments', label: 'Include Attachments Summary', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'event-dependency',
    name: 'Event Dependency Mapper Agent',
    shortName: 'Dependencies',
    description: 'Identifies dependencies between events, highlighting blockers.',
    icon: 'Network',
    categoryId: 'event-management',
    webhookUrl: '/webhook/agent-event-dependency',
    outputType: 'mixed',
    inputs: [
      { name: 'eventNumbers', label: 'Event Number(s)', type: 'textarea', required: true, rows: 2 },
      { name: 'dependencyTypes', label: 'Dependency Types to Check', type: 'multi-select', required: false, options: [
        { value: 'code', label: 'Code' },
        { value: 'data', label: 'Data' },
        { value: 'sequential', label: 'Sequential' },
        { value: 'blocking', label: 'Blocking' },
      ]},
      { name: 'visualFormat', label: 'Visualisation Format', type: 'select', required: false, options: [
        { value: 'text', label: 'Text' },
        { value: 'diagram', label: 'Diagram' },
      ]},
    ],
  },
  {
    id: 'stale-event-detector',
    name: 'Stale Event Detector Agent',
    shortName: 'Stale Events',
    description: 'Finds events with no recent activity that need attention.',
    icon: 'Clock',
    categoryId: 'event-management',
    webhookUrl: '/webhook/agent-stale-events',
    outputType: 'markdown',
    inputs: [
      { name: 'dateRangeOrList', label: 'Date Range or Event List', type: 'textarea', required: true, rows: 2 },
      { name: 'stalenessThreshold', label: 'Staleness Threshold (Days)', type: 'number', required: false, placeholder: 'e.g., 14' },
      { name: 'statusFilter', label: 'Status Filter', type: 'select', required: false, options: [
        { value: 'open', label: 'Open' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'all', label: 'All' },
      ]},
    ],
  },
  {
    id: 'event-handover',
    name: 'Event Handover Agent',
    shortName: 'Handover',
    description: 'Generates comprehensive handover documentation when work transfers.',
    icon: 'ArrowRightLeft',
    categoryId: 'event-management',
    webhookUrl: '/webhook/agent-event-handover',
    outputType: 'markdown',
    inputs: [
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: true },
      { name: 'outgoingDev', label: 'Outgoing Developer Name', type: 'text', required: false },
      { name: 'incomingDev', label: 'Incoming Developer Name', type: 'text', required: false },
      { name: 'handoverLevel', label: 'Handover Detail Level', type: 'select', required: false, options: [
        { value: 'quick', label: 'Quick' },
        { value: 'comprehensive', label: 'Comprehensive' },
      ]},
    ],
  },
  {
    id: 'support-escalation',
    name: 'Support Escalation Analyst Agent',
    shortName: 'Escalation',
    description: 'Analyses support tickets to determine if issues are bugs, config problems, or user errors.',
    icon: 'ArrowUp',
    categoryId: 'event-management',
    webhookUrl: '/webhook/agent-support-escalation',
    outputType: 'markdown',
    inputs: [
      { name: 'eventNumber', label: 'Event Number (Support Ticket)', type: 'text', required: true },
      { name: 'customerImpact', label: 'Customer Impact Level', type: 'select', required: false, options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' },
      ]},
      { name: 'timeSensitivity', label: 'Time Sensitivity', type: 'select', required: false, options: [
        { value: 'normal', label: 'Normal' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'critical', label: 'Critical' },
      ]},
    ],
  },

  // ==========================================================================
  // SYSPRO-SPECIFIC (6 agents)
  // ==========================================================================
  {
    id: 'bo-explorer',
    name: 'Business Object Explorer Agent',
    shortName: 'BO Explorer',
    description: 'Recommends which e.Net Business Objects to use for a given business process.',
    icon: 'Compass',
    categoryId: 'syspro-specific',
    webhookUrl: '/webhook/agent-bo-explorer',
    outputType: 'markdown',
    inputs: [
      { name: 'businessProcess', label: 'Business Process Description', type: 'textarea', required: true, rows: 4 },
      { name: 'modulesInvolved', label: 'SYSPRO Modules Involved', type: 'text', required: false },
      { name: 'includeSampleCode', label: 'Include Sample Code', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'transaction-flow',
    name: 'Transaction Flow Analyst Agent',
    shortName: 'Txn Flow',
    description: 'Traces and documents transaction flow through SYSPRO modules.',
    icon: 'GitBranch',
    categoryId: 'syspro-specific',
    webhookUrl: '/webhook/agent-transaction-flow',
    outputType: 'mixed',
    inputs: [
      { name: 'transactionType', label: 'Transaction Type or Starting Point', type: 'text', required: true, placeholder: 'e.g., Sales Order to Invoice' },
      { name: 'includeTableFlow', label: 'Include Table/Data Flow', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
      { name: 'includeIntegrations', label: 'Include Integration Points', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'setup-advisor',
    name: 'Setup Advisor Agent',
    shortName: 'Setup Advisor',
    description: 'Recommends SYSPRO setup options based on business requirements.',
    icon: 'Settings',
    categoryId: 'syspro-specific',
    webhookUrl: '/webhook/agent-setup-advisor',
    outputType: 'markdown',
    inputs: [
      { name: 'businessRequirement', label: 'Business Requirement Description', type: 'textarea', required: true, rows: 4 },
      { name: 'sysproModules', label: 'SYSPRO Module(s)', type: 'text', required: true },
      { name: 'currentSetup', label: 'Current Setup Export (for comparison)', type: 'file', required: false, accept: '.xml,.txt,.csv' },
    ],
  },
  {
    id: 'custom-form-validator',
    name: 'Custom Form Validator Agent',
    shortName: 'Form Validator',
    description: 'Validates SYSPRO custom forms against UI standards and best practices.',
    icon: 'FormInput',
    categoryId: 'syspro-specific',
    webhookUrl: '/webhook/agent-form-validator',
    outputType: 'markdown',
    inputs: [
      { name: 'formName', label: 'Form Name/Identifier', type: 'text', required: true },
      { name: 'formDefinition', label: 'Form Definition File', type: 'file', required: true, accept: '.xml,.json' },
      { name: 'validationRules', label: 'Validation Rules', type: 'multi-select', required: false, options: [
        { value: 'ui-standards', label: 'UI Standards' },
        { value: 'accessibility', label: 'Accessibility' },
        { value: 'performance', label: 'Performance' },
      ]},
    ],
  },
  {
    id: 'data-dictionary',
    name: 'Data Dictionary Agent',
    shortName: 'Data Dict',
    description: 'Provides field definitions, table relationships, and usage examples.',
    icon: 'BookOpen',
    categoryId: 'syspro-specific',
    webhookUrl: '/webhook/agent-data-dictionary',
    outputType: 'markdown',
    inputs: [
      { name: 'tableOrFieldNames', label: 'Table Name(s) or Field Name(s)', type: 'text', required: true },
      { name: 'includeRelationships', label: 'Include Relationships', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
      { name: 'includeExamples', label: 'Include Usage Examples', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'upgrade-assessor',
    name: 'Upgrade Impact Assessor Agent',
    shortName: 'Upgrade Impact',
    description: 'Analyses custom programs against new SYSPRO versions to identify breaking changes.',
    icon: 'ArrowUpCircle',
    categoryId: 'syspro-specific',
    webhookUrl: '/webhook/agent-upgrade-assessor',
    outputType: 'mixed',
    inputs: [
      { name: 'currentVersion', label: 'Current SYSPRO Version', type: 'text', required: true },
      { name: 'targetVersion', label: 'Target SYSPRO Version', type: 'text', required: true },
      { name: 'customPrograms', label: 'Custom Program List or "all"', type: 'textarea', required: true, rows: 3 },
      { name: 'includeRemediation', label: 'Include Remediation Suggestions', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },

  // ==========================================================================
  // TEAM & PROCESS (5 agents)
  // ==========================================================================
  {
    id: 'sprint-summary',
    name: 'Sprint Summary Agent',
    shortName: 'Sprint Summary',
    description: 'Generates sprint retrospective data, velocity metrics, and work completion summaries.',
    icon: 'BarChart',
    categoryId: 'team-process',
    webhookUrl: '/webhook/agent-sprint-summary',
    outputType: 'markdown',
    inputs: [
      { name: 'sprintId', label: 'Sprint Identifier or Date Range', type: 'text', required: true },
      { name: 'teamName', label: 'Team Name', type: 'text', required: true },
      { name: 'includeVelocity', label: 'Include Velocity Metrics', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
      { name: 'includeIndividual', label: 'Include Individual Contributions', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'dev-onboarding',
    name: 'Developer Onboarding Agent',
    shortName: 'Onboarding',
    description: 'Creates personalised onboarding plans for new developers.',
    icon: 'UserPlus',
    categoryId: 'team-process',
    webhookUrl: '/webhook/agent-dev-onboarding',
    outputType: 'markdown',
    inputs: [
      { name: 'developerName', label: 'New Developer Name', type: 'text', required: true },
      { name: 'assignedModules', label: 'Assigned Modules/Areas', type: 'text', required: true },
      { name: 'experienceLevel', label: 'Experience Level', type: 'select', required: false, options: [
        { value: 'junior', label: 'Junior' },
        { value: 'mid', label: 'Mid-Level' },
        { value: 'senior', label: 'Senior' },
      ]},
      { name: 'startDate', label: 'Start Date', type: 'text', required: false },
    ],
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes Agent',
    shortName: 'Meeting Notes',
    description: 'Extracts action items and decisions from meeting notes.',
    icon: 'FileEdit',
    categoryId: 'team-process',
    webhookUrl: '/webhook/agent-meeting-notes',
    outputType: 'markdown',
    inputs: [
      { name: 'transcript', label: 'Meeting Transcript or Notes', type: 'textarea', required: true, rows: 8 },
      { name: 'meetingType', label: 'Meeting Type', type: 'select', required: false, options: [
        { value: 'sprint-planning', label: 'Sprint Planning' },
        { value: 'retrospective', label: 'Retrospective' },
        { value: 'technical', label: 'Technical' },
        { value: 'general', label: 'General' },
      ]},
      { name: 'attendees', label: 'Attendees List', type: 'text', required: false },
      { name: 'autoCreateEvents', label: 'Auto-create Errtrk Events', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
    ],
  },
  {
    id: 'review-assignment',
    name: 'Code Review Assignment Agent',
    shortName: 'Review Assign',
    description: 'Suggests optimal code reviewers based on expertise and workload.',
    icon: 'UserCheck',
    categoryId: 'team-process',
    webhookUrl: '/webhook/agent-review-assignment',
    outputType: 'markdown',
    inputs: [
      { name: 'programNames', label: 'Program Name(s) to Review', type: 'text', required: true },
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: false },
      { name: 'excludeReviewers', label: 'Exclude Reviewers', type: 'text', required: false, placeholder: 'e.g., the author' },
      { name: 'urgencyLevel', label: 'Urgency Level', type: 'select', required: false, options: [
        { value: 'low', label: 'Low' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' },
      ]},
    ],
  },
  {
    id: 'capacity-planner',
    name: 'Capacity Planner Agent',
    shortName: 'Capacity',
    description: 'Analyses team capacity against backlog, identifying resourcing risks.',
    icon: 'PieChart',
    categoryId: 'team-process',
    webhookUrl: '/webhook/agent-capacity-planner',
    outputType: 'mixed',
    inputs: [
      { name: 'teamName', label: 'Team Name', type: 'text', required: true },
      { name: 'planningPeriod', label: 'Planning Period', type: 'select', required: true, options: [
        { value: 'sprint', label: 'Sprint' },
        { value: 'month', label: 'Month' },
        { value: 'quarter', label: 'Quarter' },
      ]},
      { name: 'includeLeave', label: 'Include Leave/Holidays', type: 'select', required: false, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]},
      { name: 'backlogFilter', label: 'Event Backlog Filter', type: 'text', required: false },
    ],
  },

  // ==========================================================================
  // CUSTOMER & SUPPORT (4 agents)
  // ==========================================================================
  {
    id: 'customer-comms',
    name: 'Customer Communication Drafter Agent',
    shortName: 'Customer Comms',
    description: 'Drafts professional customer-facing emails for various communications.',
    icon: 'Mail',
    categoryId: 'customer-support',
    webhookUrl: '/webhook/agent-customer-comms',
    outputType: 'markdown',
    inputs: [
      { name: 'eventNumber', label: 'Event Number', type: 'text', required: true },
      { name: 'communicationType', label: 'Communication Type', type: 'select', required: true, options: [
        { value: 'acknowledgment', label: 'Acknowledgment' },
        { value: 'status-update', label: 'Status Update' },
        { value: 'resolution', label: 'Resolution' },
        { value: 'release-notification', label: 'Release Notification' },
      ]},
      { name: 'customerName', label: 'Customer Name/Company', type: 'text', required: false },
      { name: 'tone', label: 'Tone', type: 'select', required: false, options: [
        { value: 'formal', label: 'Formal' },
        { value: 'friendly', label: 'Friendly' },
      ]},
    ],
  },
  {
    id: 'training-material',
    name: 'Training Material Generator Agent',
    shortName: 'Training',
    description: 'Creates training guides, quick-reference cards, or video scripts.',
    icon: 'GraduationCap',
    categoryId: 'customer-support',
    webhookUrl: '/webhook/agent-training-material',
    outputType: 'markdown',
    inputs: [
      { name: 'featureName', label: 'Feature/Program Name', type: 'text', required: true },
      { name: 'brdOrSpec', label: 'BRD or Functional Spec', type: 'textarea', required: true, rows: 4 },
      { name: 'targetAudience', label: 'Target Audience', type: 'select', required: false, options: [
        { value: 'end-user', label: 'End User' },
        { value: 'power-user', label: 'Power User' },
        { value: 'admin', label: 'Administrator' },
      ]},
      { name: 'format', label: 'Format', type: 'select', required: false, options: [
        { value: 'guide', label: 'Guide' },
        { value: 'quick-reference', label: 'Quick Reference Card' },
        { value: 'video-script', label: 'Video Script' },
      ]},
    ],
  },
  {
    id: 'faq-generator',
    name: 'FAQ Generator Agent',
    shortName: 'FAQ',
    description: 'Analyses patterns in resolved support tickets to generate FAQ entries.',
    icon: 'HelpCircle',
    categoryId: 'customer-support',
    webhookUrl: '/webhook/agent-faq-generator',
    outputType: 'markdown',
    inputs: [
      { name: 'eventNumbersOrTopic', label: 'Event Numbers or Topic Area', type: 'textarea', required: true, rows: 3 },
      { name: 'timePeriod', label: 'Time Period to Analyse', type: 'text', required: false },
      { name: 'minOccurrence', label: 'Minimum Occurrence Threshold', type: 'number', required: false, placeholder: 'e.g., 3' },
    ],
  },
  {
    id: 'demo-script',
    name: 'Demo Script Generator Agent',
    shortName: 'Demo Script',
    description: 'Creates structured demonstration scripts for showcasing new functionality.',
    icon: 'Presentation',
    categoryId: 'customer-support',
    webhookUrl: '/webhook/agent-demo-script',
    outputType: 'markdown',
    inputs: [
      { name: 'featureName', label: 'Feature/Program Name', type: 'text', required: true },
      { name: 'specOrEvent', label: 'Functional Specification or Event Number', type: 'textarea', required: true, rows: 3 },
      { name: 'demoDuration', label: 'Demo Duration Target (minutes)', type: 'number', required: false },
      { name: 'audience', label: 'Audience', type: 'select', required: false, options: [
        { value: 'technical', label: 'Technical' },
        { value: 'business', label: 'Business' },
        { value: 'executive', label: 'Executive' },
      ]},
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find((agent) => agent.id === id);
};

export const getAgentsByCategory = (categoryId: AgentCategoryId): Agent[] => {
  return agents.filter((agent) => agent.categoryId === categoryId);
};

export const getCategoryById = (id: AgentCategoryId): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getCategoryForAgent = (agent: Agent): Category | undefined => {
  return getCategoryById(agent.categoryId);
};
