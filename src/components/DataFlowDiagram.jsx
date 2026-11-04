import React from 'react';

// "Where your data goes" diagram for the governance page. Two hand-laid SVGs —
// a wide one for desktop and a tall one for phones — swapped by CSS
// (.m-flow-wide / .m-flow-tall). Keep their content identical when editing.
//
// Layout rule for both: the AI model connects to Curia (top of the server) and
// the tools connect to the vault (lower in the server), so the AI model sits
// above or beside the tools and the two connectors never cross.

const TEAL = '#265058';
const INK = '#1F1F1F';
const MUTE = '#6E6A62';
const ACCENT = '#8A3B2E';
const CARD = '#FFFDF8';
const LINE = 'rgba(31,31,31,0.18)';
const DARK = '#1F2622';

const Box = ({ x, y, w, h, title, sub, dark, dashed, titleSize = 16 }) => {
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="8"
        fill={dark ? DARK : dashed ? 'none' : CARD}
        stroke={dark ? DARK : dashed ? TEAL : LINE}
        strokeWidth={dashed ? 1.5 : 1}
        strokeDasharray={dashed ? '6 5' : undefined}
      />
      <text
        x={x + w / 2} y={sub ? cy - 4 : cy + 5} textAnchor="middle"
        className="m-flow-title" fontSize={titleSize}
        fill={dark ? '#F4EFE6' : dashed ? TEAL : INK}
      >{title}</text>
      {sub && (
        <text x={x + w / 2} y={cy + 15} textAnchor="middle" fontSize="12" fill={dark ? '#C9C4B8' : MUTE}>
          {sub}
        </text>
      )}
    </g>
  );
};

const Label = ({ x, y, children, anchor = 'middle', fill = MUTE }) => (
  <text x={x} y={y} textAnchor={anchor} className="m-flow-label" fill={fill}>{children}</text>
);

const Arrow = ({ id }) => (
  <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
    <path d="M0,1 L9,5 L0,9 z" fill={TEAL} />
  </marker>
);

const DESC =
  'You reach Curia by email, Signal, or phone. Curia, its memory, its audit trail, and its vault of keys ' +
  'all live on your server, hosted wherever you choose. Curia sends conversation context to the AI model ' +
  'you choose, but never your secrets; with an optional local model, nothing leaves the server. Keys go ' +
  'from the vault straight to your tools, such as Gmail, Google Docs, Notion, and QuickBooks. Curia the ' +
  'company, ad networks, and platforms are not in the path.';

const Wide = () => (
  <svg className="m-flow-wide" viewBox="0 0 960 510" role="img" aria-labelledby="flow-w-t flow-w-d">
    <title id="flow-w-t">Where your data goes</title>
    <desc id="flow-w-d">{DESC}</desc>
    <defs><Arrow id="flow-w-a" /></defs>

    {/* You */}
    <Label x={75} y={34}>YOU</Label>
    <Box x={0} y={86} w={150} h={44} title="Email" titleSize={15} />
    <Box x={0} y={142} w={150} h={44} title="Signal" titleSize={15} />
    <Box x={0} y={198} w={150} h={44} title="Phone" titleSize={15} />

    {/* Your server */}
    <Label x={410} y={34} fill={TEAL}>YOUR SERVER</Label>
    <rect x="230" y="56" width="360" height="392" rx="14" fill="#E4ECE8" stroke={TEAL} strokeWidth="1.5" />
    <g fill="none" stroke={TEAL} strokeWidth="1.5">
      <path d="M150,108 C200,108 205,112 250,112" markerEnd="url(#flow-w-a)" />
      <path d="M150,164 C205,164 205,112 250,112" />
      <path d="M150,220 C210,220 205,112 250,112" />
    </g>
    <Box x={254} y={80} w={312} h={64} title="Curia" sub="reads, decides, acts" titleSize={18} />
    <Box x={254} y={164} w={148} h={76} title="Memory" sub="knowledge graph + docs" />
    <Box x={418} y={164} w={148} h={76} title="Audit trail" sub="every action, and why" />
    <Box x={254} y={260} w={312} h={70} title="Vault" sub="passwords, API keys, account access" dark />
    <Box x={254} y={350} w={312} h={62} title="Optional: local AI model" sub="then nothing leaves the server" dashed />
    <text x={410} y={436} textAnchor="middle" fontSize="12" fontStyle="italic" fill={MUTE}>Hosted wherever you choose</text>

    {/* AI model — level with Curia */}
    <Box x={720} y={80} w={240} h={64} title="AI model" sub="a provider you choose" />
    <path d="M566,112 L716,112" stroke={TEAL} strokeWidth="1.5" markerEnd="url(#flow-w-a)" />
    <Label x={641} y={102}>conversation</Label>
    <Label x={641} y={132} fill={ACCENT}>never secrets</Label>

    {/* Tools — level with the vault */}
    <Label x={840} y={202}>YOUR TOOLS</Label>
    <Box x={720} y={212} w={240} h={40} title="Gmail & Calendar" titleSize={14} />
    <Box x={720} y={260} w={240} h={40} title="Google Docs" titleSize={14} />
    <Box x={720} y={308} w={240} h={40} title="Notion" titleSize={14} />
    <Box x={720} y={356} w={240} h={40} title="QuickBooks" titleSize={14} />
    <g fill="none" stroke={TEAL} strokeWidth="1.5">
      <path d="M566,295 L672,295" />
      <path d="M672,232 L672,376" />
      {[232, 280, 328, 376].map((y) => (
        <path key={y} d={`M672,${y} L716,${y}`} markerEnd="url(#flow-w-a)" />
      ))}
    </g>
    <Label x={619} y={274}>keys go</Label>
    <Label x={619} y={288}>straight</Label>

    {/* Not in the path */}
    <rect x="0.5" y="466" width="959" height="38" rx="8" fill="none" stroke={LINE} strokeDasharray="4 4" />
    <text x="480" y="490" textAnchor="middle" fontSize="13.5" fill={MUTE}>
      <tspan fontWeight="700" fill={INK}>Not in the path:</tspan>
      {'  Curia the company  ·  an ad network  ·  a platform that keeps a copy'}
    </text>
  </svg>
);

const Tall = () => (
  <svg className="m-flow-tall" viewBox="0 0 360 880" role="img" aria-labelledby="flow-t-t flow-t-d">
    <title id="flow-t-t">Where your data goes</title>
    <desc id="flow-t-d">{DESC}</desc>
    <defs><Arrow id="flow-t-a" /></defs>

    {/* You */}
    <Label x={180} y={18}>YOU</Label>
    <Box x={0} y={30} w={104} h={40} title="Email" titleSize={14} />
    <Box x={128} y={30} w={104} h={40} title="Signal" titleSize={14} />
    <Box x={256} y={30} w={104} h={40} title="Phone" titleSize={14} />

    {/* Your server */}
    <rect x="20" y="104" width="320" height="410" rx="14" fill="#E4ECE8" stroke={TEAL} strokeWidth="1.5" />
    <g fill="none" stroke={TEAL} strokeWidth="1.5">
      <path d="M52,70 C52,110 180,100 180,132" />
      <path d="M180,70 L180,132" markerEnd="url(#flow-t-a)" />
      <path d="M308,70 C308,110 180,100 180,132" />
    </g>
    <Box x={36} y={136} w={288} h={60} title="Curia" sub="reads, decides, acts" titleSize={17} />
    <Box x={36} y={212} w={140} h={70} title="Memory" sub="graph + docs" />
    <Box x={184} y={212} w={140} h={70} title="Audit trail" sub="every action, why" />
    <Box x={36} y={298} w={288} h={64} title="Vault" sub="passwords, keys, account access" dark />
    <Box x={36} y={378} w={288} h={60} title="Optional: local AI model" sub="then nothing leaves" dashed titleSize={15} />
    <Label x={180} y={472} fill={TEAL}>YOUR SERVER</Label>
    <text x={180} y={492} textAnchor="middle" fontSize="12" fontStyle="italic" fill={MUTE}>Hosted wherever you choose</text>

    {/* AI model — fed from Curia down the left edge */}
    <path d="M36,166 L8,166 L8,616 L20,616" fill="none" stroke={TEAL} strokeWidth="1.5" markerEnd="url(#flow-t-a)" />
    <Box x={24} y={584} w={152} h={64} title="AI model" sub="you choose" titleSize={15} />
    <Label x={100} y={672}>conversation,</Label>
    <Label x={100} y={688} fill={ACCENT}>never secrets</Label>

    {/* Tools — fed from the vault down the right edge */}
    <Label x={268} y={572}>YOUR TOOLS</Label>
    <path d="M324,330 L352,330 L352,742" fill="none" stroke={TEAL} strokeWidth="1.5" />
    {[602, 648, 694, 740].map((cy) => (
      <path key={cy} d={`M352,${cy} L342,${cy}`} stroke={TEAL} strokeWidth="1.5" markerEnd="url(#flow-t-a)" />
    ))}
    <Box x={192} y={584} w={148} h={36} title="Gmail & Calendar" titleSize={12.5} />
    <Box x={192} y={630} w={148} h={36} title="Google Docs" titleSize={12.5} />
    <Box x={192} y={676} w={148} h={36} title="Notion" titleSize={12.5} />
    <Box x={192} y={722} w={148} h={36} title="QuickBooks" titleSize={12.5} />
    <Label x={266} y={784}>keys go straight to the tool</Label>

    {/* Not in the path */}
    <rect x="0.5" y="808" width="359" height="66" rx="8" fill="none" stroke={LINE} strokeDasharray="4 4" />
    <text x="180" y="834" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Not in the path:</text>
    <text x="180" y="856" textAnchor="middle" fontSize="12.5" fill={MUTE}>Curia the company · ad networks · platforms</text>
  </svg>
);

const DataFlowDiagram = () => (
  <figure className="m-flow">
    <Wide />
    <Tall />
  </figure>
);

export default DataFlowDiagram;
