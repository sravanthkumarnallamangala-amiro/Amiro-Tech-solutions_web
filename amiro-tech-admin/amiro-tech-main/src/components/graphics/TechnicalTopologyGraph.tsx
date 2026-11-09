import { useState } from 'react'
import { Icon, type IconName } from '../common'

export type TopologyNode = {
  id: string
  code: string
  title: string
  subtitle: string
  tier: 'ingress' | 'orchestration' | 'intelligence' | 'persistence'
  icon: IconName
  status: string
  statusColor: 'green' | 'amber' | 'cyan'
  metrics: string
  tags: string[]
  detail: string
  downstream?: string[]
}

const TOPOLOGY_NODES: TopologyNode[] = [
  // Tier 1: Ingress & Edge
  {
    id: 'edge-ingress',
    code: 'INGRESS::01',
    title: 'Global Edge & Ingress',
    subtitle: 'Anycast DNS · TLS 1.3 · DDoS Mitigation',
    tier: 'ingress',
    icon: 'globe',
    status: 'ONLINE',
    statusColor: 'green',
    metrics: '< 8ms global edge latency',
    tags: ['HTTP/3', 'WAF Shield', 'SSL Termination', 'Static Edge'],
    detail: 'Terminates encrypted traffic at edge locations worldwide, applying web application firewall inspection and automated rate throttling before proxying to the gateway.',
    downstream: ['api-gateway', 'telephony-gateway'],
  },
  {
    id: 'telephony-gateway',
    code: 'INGRESS::02',
    title: 'Voice & Media Gateway',
    subtitle: 'SIP Trunking · WebRTC · Opus Audio Stream',
    tier: 'ingress',
    icon: 'voice',
    status: 'STREAMING',
    statusColor: 'cyan',
    metrics: '18ms bi-directional audio buffer',
    tags: ['WebRTC', 'VAD Detector', 'Opus 48kHz', 'SIP Bridge'],
    detail: 'Ingests low-latency bi-directional voice streams from telephony providers, running real-time voice activity detection (VAD) and streaming audio directly to neural models.',
    downstream: ['event-mesh', 'ai-inference'],
  },

  // Tier 2: Orchestration & Mesh
  {
    id: 'api-gateway',
    code: 'GATEWAY::01',
    title: 'Zero-Trust API Gateway',
    subtitle: 'OAuth2 · JWT Validation · Token-Bucket Quotas',
    tier: 'orchestration',
    icon: 'shield',
    status: 'PROTECTED',
    statusColor: 'green',
    metrics: 'Zero-trust auth verification',
    tags: ['JWT Claims', 'RBAC Scopes', 'Route Guard', 'Envoy'],
    detail: 'Validates cryptographic credentials and organizational access policies across all client requests, routing traffic into internal domain services.',
    downstream: ['domain-services', 'event-mesh'],
  },
  {
    id: 'event-mesh',
    code: 'BROKER::01',
    title: 'Distributed Event Mesh',
    subtitle: 'Asynchronous Task Workers · Pub/Sub Conduits',
    tier: 'orchestration',
    icon: 'flow',
    status: 'ACTIVE',
    statusColor: 'amber',
    metrics: '99.999% queue delivery guarantee',
    tags: ['AMQP Event Bus', 'Idempotent Workers', 'Dead-Letter', 'Celery'],
    detail: 'Decouples long-running operations, background processing, notifications, and scheduled workflows into guaranteed async queues.',
    downstream: ['ai-inference', 'domain-services'],
  },

  // Tier 3: Intelligence & Domain Logic
  {
    id: 'ai-inference',
    code: 'NEURAL::01',
    title: 'Agentic AI & Neural Engine',
    subtitle: 'RAG Retrieval · Vector Search · Tool Orchestrator',
    tier: 'intelligence',
    icon: 'sparkle',
    status: 'ENGAGED',
    statusColor: 'cyan',
    metrics: 'Sub-second token streaming',
    tags: ['Vector Embeddings', 'RAG Context', 'Tool Calling', 'Python Core'],
    detail: 'Executes generative pipelines and autonomous tool calls against business documents and databases, returning structured decisions and synthesized responses.',
    downstream: ['acid-database', 'redis-cache'],
  },
  {
    id: 'domain-services',
    code: 'LOGIC::01',
    title: 'Domain Services Engine',
    subtitle: 'ACID Business Validation · Audit Journaling',
    tier: 'intelligence',
    icon: 'layers',
    status: 'SYNCED',
    statusColor: 'green',
    metrics: 'Multi-tenant isolated state',
    tags: ['Schema Validated', 'Audit Journal', 'Transactional', 'CQRS'],
    detail: 'Enforces business rules, validation schemas, calibration workflows, and immutable compliance event tracking across all enterprise operations.',
    downstream: ['acid-database', 'redis-cache'],
  },

  // Tier 4: Resilient State & Data Fabric
  {
    id: 'acid-database',
    code: 'STORAGE::01',
    title: 'High-Availability ACID Database',
    subtitle: 'PostgreSQL Primary + Replica · Point-in-time Recovery',
    tier: 'persistence',
    icon: 'database',
    status: 'REPLICATED',
    statusColor: 'green',
    metrics: 'AES-256 encryption at rest',
    tags: ['PostgreSQL', 'WAL Sync', 'Encrypted Backups', 'Audit Logs'],
    detail: 'Stores transactional records with full ACID guarantees, encrypted WAL archiving, and automated failover across availability zones.',
  },
  {
    id: 'redis-cache',
    code: 'MEMORY::01',
    title: 'In-Memory State & Cache Fabric',
    subtitle: 'Distributed Sessions · Low-Latency Cache',
    tier: 'persistence',
    icon: 'cloud',
    status: 'CLUSTERED',
    statusColor: 'amber',
    metrics: '< 1ms read latency',
    tags: ['Redis Cluster', 'Pub/Sub', 'Token Store', 'State Invalidation'],
    detail: 'Maintains hot distributed session tokens, real-time telephony state, cache invalidation tags, and pub/sub signaling across worker clusters.',
  },
]

const TIERS = [
  { key: 'ingress', name: 'Edge & Ingress' },
  { key: 'orchestration', name: 'Gateway & Mesh' },
  { key: 'intelligence', name: 'Core & AI Engine' },
  { key: 'persistence', name: 'State & Storage' },
] as const

export function TechnicalTopologyGraph() {
  const [activeNodeId, setActiveNodeId] = useState<string>('ai-inference')
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'data' | 'security'>('all')

  const activeNode = TOPOLOGY_NODES.find((n) => n.id === activeNodeId) ?? TOPOLOGY_NODES[4]

  const isHighlighted = (node: TopologyNode) => {
    if (activeFilter === 'ai') {
      return ['telephony-gateway', 'ai-inference', 'event-mesh', 'redis-cache'].includes(node.id)
    }
    if (activeFilter === 'data') {
      return ['api-gateway', 'domain-services', 'acid-database', 'redis-cache'].includes(node.id)
    }
    if (activeFilter === 'security') {
      return ['edge-ingress', 'api-gateway', 'domain-services', 'acid-database'].includes(node.id)
    }
    return true
  }

  return (
    <div className="topology">
      {/* Topology Terminal Header / HUD */}
      <div className="topology__hud">
        <div className="topology__hud-left">
          <div className="topology__window-dots" aria-hidden="true">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="topology__hud-title">SYSTEM_TOPOLOGY // CLUSTER-AP-SOUTH-1</span>
        </div>
        <div className="topology__hud-stats">
          <span className="topology__status-pill">
            <span className="status-beacon status-beacon--pulse" />
            PRODUCTION TOPOLOGY · 99.99% SLA
          </span>
          <div className="topology__filters">
            <button
              type="button"
              className={['topology__filter-btn', activeFilter === 'all' ? 'is-active' : ''].join(' ')}
              onClick={() => setActiveFilter('all')}
            >
              All Flows
            </button>
            <button
              type="button"
              className={['topology__filter-btn', activeFilter === 'ai' ? 'is-active' : ''].join(' ')}
              onClick={() => setActiveFilter('ai')}
            >
              AI & Voice
            </button>
            <button
              type="button"
              className={['topology__filter-btn', activeFilter === 'data' ? 'is-active' : ''].join(' ')}
              onClick={() => setActiveFilter('data')}
            >
              Data State
            </button>
            <button
              type="button"
              className={['topology__filter-btn', activeFilter === 'security' ? 'is-active' : ''].join(' ')}
              onClick={() => setActiveFilter('security')}
            >
              Security
            </button>
          </div>
        </div>
      </div>

      {/* Main Graph Grid: 4 Connected Tiers */}
      <div className="topology__body">
        {/* Animated Background Data Conduit Rays */}
        <div className="topology__conduits-bg" aria-hidden="true">
          <div className="conduit conduit--1" />
          <div className="conduit conduit--2" />
          <div className="conduit conduit--3" />
        </div>

        <div className="topology__canvas">
          {TIERS.map((tier, tierIdx) => {
            const tierNodes = TOPOLOGY_NODES.filter((n) => n.tier === tier.key)
            return (
              <div className="topology__column" key={tier.key}>
                <div className="topology__tier-header">
                  <span className="topology__tier-step">0{tierIdx + 1}</span>
                  <span className="topology__tier-name">{tier.name}</span>
                </div>

                <div className="topology__node-stack">
                  {tierNodes.map((node) => {
                    const selected = node.id === activeNodeId
                    const highlighted = isHighlighted(node)
                    return (
                      <div
                        key={node.id}
                        className={[
                          'topology-node',
                          selected ? 'is-selected' : '',
                          highlighted ? 'is-highlighted' : 'is-dimmed',
                        ].join(' ')}
                        onClick={() => setActiveNodeId(node.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setActiveNodeId(node.id)
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected}
                      >
                        <div className="topology-node__top">
                          <span className="topology-node__code">{node.code}</span>
                          <span className={`topology-node__badge topology-node__badge--${node.statusColor}`}>
                            <span className="topology-node__beacon" />
                            {node.status}
                          </span>
                        </div>

                        <div className="topology-node__title-row">
                          <span className="topology-node__icon">
                            <Icon name={node.icon} />
                          </span>
                          <span className="topology-node__name">{node.title}</span>
                        </div>

                        <p className="topology-node__sub">{node.subtitle}</p>

                        <div className="topology-node__tags">
                          {node.tags.slice(0, 3).map((tag) => (
                            <span className="topology-node__tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="topology-node__foot">
                          <span className="topology-node__metric">{node.metrics}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Live Node Inspector HUD */}
        <div className="topology__inspector">
          <div className="topology__inspector-header">
            <div className="topology__inspector-left">
              <span className="topology__inspector-tag">ACTIVE_NODE_TELEMETRY</span>
              <span className="topology__inspector-code">{activeNode.code}</span>
              <h4 className="topology__inspector-name">{activeNode.title}</h4>
            </div>
            <div className="topology__inspector-metric">
              <span className="topology__inspector-label">METRIC SPEC</span>
              <span className="topology__inspector-value">{activeNode.metrics}</span>
            </div>
          </div>

          <p className="topology__inspector-detail">{activeNode.detail}</p>

          <div className="topology__inspector-tags">
            <span className="topology__inspector-label">DEPLOYED STACK & PROTOCOLS:</span>
            {activeNode.tags.map((t) => (
              <span className="topology__inspector-chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

