from datetime import date
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_ROW_HEIGHT_RULE, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "docs" / "alansa-logo.png"
OUTPUT = ROOT / "docs" / "Alansa_LIMS_Budgetary_Commercial_Proposal_TUV_Rheinland.docx"

INK = "14233B"
BLUE = "0759C7"
CYAN = "18B9D5"
PALE = "EAF5FC"
MIST = "F4F7FA"
SLATE = "526173"
LINE = "D8E1EA"
WHITE = "FFFFFF"


def shade(cell, color):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), color)


def borders(cell, color=LINE, size=4):
    tc_pr = cell._tc.get_or_add_tcPr()
    node = tc_pr.first_child_found_in("w:tcBorders")
    if node is None:
        node = OxmlElement("w:tcBorders")
        tc_pr.append(node)
    for edge in ("top", "left", "bottom", "right"):
        item = OxmlElement(f"w:{edge}")
        item.set(qn("w:val"), "single")
        item.set(qn("w:sz"), str(size))
        item.set(qn("w:color"), color)
        node.append(item)


def margins(cell, top=90, start=110, bottom=90, end=110):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for side, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        item = OxmlElement(f"w:{side}")
        item.set(qn("w:w"), str(value))
        item.set(qn("w:type"), "dxa")
        tc_mar.append(item)


def set_cell(cell, text, *, bold=False, color=SLATE, size=9, fill=None, align=None):
    cell.text = ""
    margins(cell)
    if fill:
        shade(cell, fill)
    paragraph = cell.paragraphs[0]
    paragraph.paragraph_format.space_after = Pt(0)
    if align is not None:
        paragraph.alignment = align
    run = paragraph.add_run(text)
    run.bold = bold
    run.font.name = "Aptos"
    run.font.size = Pt(size)
    run.font.color.rgb = RGBColor.from_string(color)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER


def text(document, value, *, size=9.5, color=SLATE, bold=False, after=6, before=0):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_before = Pt(before)
    paragraph.paragraph_format.space_after = Pt(after)
    paragraph.paragraph_format.line_spacing = 1.12
    run = paragraph.add_run(value)
    run.font.name = "Aptos"
    run.font.size = Pt(size)
    run.font.color.rgb = RGBColor.from_string(color)
    run.bold = bold
    return paragraph


def heading(document, number, title):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_before = Pt(8)
    paragraph.paragraph_format.space_after = Pt(9)
    paragraph.paragraph_format.keep_with_next = True
    p_pr = paragraph._p.get_or_add_pPr()
    p_bdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "12")
    bottom.set(qn("w:space"), "5")
    bottom.set(qn("w:color"), CYAN)
    p_bdr.append(bottom)
    p_pr.append(p_bdr)
    number_run = paragraph.add_run(number)
    number_run.bold = True
    number_run.font.name = "Aptos"
    number_run.font.size = Pt(9)
    number_run.font.color.rgb = RGBColor.from_string(BLUE)
    divider = paragraph.add_run("  /  ")
    divider.bold = True
    divider.font.name = "Aptos"
    divider.font.size = Pt(9)
    divider.font.color.rgb = RGBColor.from_string(CYAN)
    title_run = paragraph.add_run(title.upper())
    title_run.bold = True
    title_run.font.name = "Aptos Display"
    title_run.font.size = Pt(12)
    title_run.font.color.rgb = RGBColor.from_string(INK)
    return paragraph


def bullet(document, value):
    paragraph = document.add_paragraph(style="List Bullet")
    paragraph.paragraph_format.left_indent = Inches(0.22)
    paragraph.paragraph_format.space_after = Pt(3)
    run = paragraph.add_run(value)
    run.font.name = "Aptos"
    run.font.size = Pt(9.2)
    run.font.color.rgb = RGBColor.from_string(SLATE)


def add_page_number(paragraph):
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = paragraph.add_run("ALANSA TECHNOLOGIES  •  CONFIDENTIAL  •  ")
    run.font.name = "Aptos"
    run.font.size = Pt(7.5)
    run.font.color.rgb = RGBColor.from_string(SLATE)
    field = OxmlElement("w:fldSimple")
    field.set(qn("w:instr"), "PAGE")
    paragraph._p.append(field)


def new_content_page(document):
    document.add_page_break()


document = Document()
section = document.sections[0]
section.top_margin = Inches(0.55)
section.bottom_margin = Inches(0.55)
section.left_margin = Inches(0.7)
section.right_margin = Inches(0.7)

normal = document.styles["Normal"]
normal.font.name = "Aptos"
normal.font.size = Pt(9.5)
normal.font.color.rgb = RGBColor.from_string(SLATE)

header = section.header
header.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.LEFT
header.paragraphs[0].add_run().add_picture(str(LOGO), width=Inches(1.55))
add_page_number(section.footer.paragraphs[0])

# Cover: restrained corporate layout with clear hierarchy and ample whitespace.
rule = document.add_table(rows=1, cols=2)
rule.autofit = False
rule.columns[0].width = Inches(5.8)
rule.columns[1].width = Inches(0.9)
rule.cell(0, 0).width = Inches(5.8)
rule.cell(0, 1).width = Inches(0.9)
set_cell(rule.cell(0, 0), "", fill=INK)
set_cell(rule.cell(0, 1), "", fill=CYAN)
rule.rows[0].height = Inches(0.07)
rule.rows[0].height_rule = WD_ROW_HEIGHT_RULE.EXACTLY
for cell in rule.rows[0].cells:
    margins(cell, top=0, start=0, bottom=0, end=0)
    cell.paragraphs[0].paragraph_format.space_before = Pt(0)
    cell.paragraphs[0].paragraph_format.space_after = Pt(0)

text(document, "BUDGETARY PROPOSAL  /  2026", size=8.5, color=BLUE, bold=True,
     before=34, after=10)
text(document, "Laboratory Information\nManagement System", size=29, color=INK,
     bold=True, after=8)
text(document, "Technical and Commercial Proposal", size=14, color=SLATE,
     after=24)

client = document.add_table(rows=1, cols=2)
client.autofit = False
client.columns[0].width = Inches(4.7)
client.columns[1].width = Inches(2.0)
client.cell(0, 0).width = Inches(4.7)
client.cell(0, 1).width = Inches(2.0)
set_cell(client.cell(0, 0), "PREPARED EXCLUSIVELY FOR\nTÜV Rheinland India",
         bold=True, color=INK, size=12, fill=MIST)
set_cell(client.cell(0, 1), "INDICATIVE BUDGET\n₹21–24 lakh*",
         bold=True, color=WHITE, size=11, fill=BLUE,
         align=WD_ALIGN_PARAGRAPH.CENTER)
client.cell(0, 0).paragraphs[0].paragraph_format.space_before = Pt(8)
client.cell(0, 0).paragraphs[0].paragraph_format.space_after = Pt(8)
client.cell(0, 1).paragraphs[0].paragraph_format.space_before = Pt(8)
client.cell(0, 1).paragraphs[0].paragraph_format.space_after = Pt(8)

text(document, "A controlled, scalable platform for laboratory operations, data integrity, compliance, reporting, and audit readiness.",
     size=10, color=SLATE, before=18, after=28)

meta = document.add_table(rows=3, cols=2)
meta.autofit = False
meta.columns[0].width = Inches(1.3)
meta.columns[1].width = Inches(5.4)
for row, pair in zip(meta.rows, [
    ("Submitted by", "Alansa Technologies"),
    ("Issue date", date(2026, 8, 28).strftime("%d %B %Y")),
    ("Validity", "30 calendar days from issue date"),
]):
    row.cells[0].width = Inches(1.3)
    row.cells[1].width = Inches(5.4)
    set_cell(row.cells[0], pair[0].upper(), bold=True, color=BLUE, size=7.8)
    set_cell(row.cells[1], pair[1], color=INK, size=9)
    borders(row.cells[0], LINE, 3)
    borders(row.cells[1], LINE, 3)

text(document, "*Exclusive of applicable taxes and third-party costs. Final commercials are subject to discovery and confirmed scope.",
     size=7.5, color=SLATE, after=0, before=12)

new_content_page(document)
heading(document, "01", "Proposal at a glance")
text(document, "Alansa Technologies proposes a secure, role-based Laboratory Information Management System (LIMS) for TÜV Rheinland India. The engagement will digitize laboratory workflows, strengthen traceability and data integrity, and provide a maintainable foundation for reporting, audit readiness, and controlled growth.")

cards = document.add_table(rows=1, cols=3)
cards.alignment = WD_TABLE_ALIGNMENT.CENTER
for cell, (title, detail) in zip(cards.rows[0].cells,
        [
            ("INVESTMENT", "₹21–24 lakh"),
            ("DELIVERY", "18–24 weeks"),
            ("MODEL", "Phased & governed"),
        ]):
    set_cell(cell, f"{title}\n{detail}", bold=True, color=INK, size=10, fill=PALE,
             align=WD_ALIGN_PARAGRAPH.CENTER)
    borders(cell, CYAN, 6)

text(document, "Why Alansa", size=11, color=INK, bold=True, before=12, after=4)
text(document, "Alansa Technologies helps enterprises translate strategy into practical, scalable technology execution. Its stated capabilities across cloud, data, AI, cybersecurity, enterprise applications, and application support align with the governance, integration, reliability, and long-term support needs of a modern LIMS program.")

text(document, "Target outcomes", size=11, color=INK, bold=True, before=8, after=4)
for item in [
    "A single controlled system for samples, tests, results, equipment, and laboratory records.",
    "Role-based approvals, complete audit trails, and defensible record history.",
    "Operational dashboards, scheduled notifications, and management-ready reports.",
    "Structured deployment, user enablement, documentation, and production handover.",
]:
    bullet(document, item)

heading(document, "02", "Solution scope")
scope = document.add_table(rows=1, cols=2)
scope.alignment = WD_TABLE_ALIGNMENT.CENTER
scope.autofit = False
for title, items in [
    ("LAB OPERATIONS", "Sample registration and tracking\nTest assignment and execution\nResults entry, review, and approval\nJob status and turnaround monitoring"),
    ("QUALITY & CONTROL", "Equipment and calibration records\nCertificates and controlled documents\nRole-based access and audit trail\nExceptions and configurable alerts"),
]:
    cell = scope.rows[0].cells[0 if title == "LAB OPERATIONS" else 1]
    set_cell(cell, f"{title}\n\n{items}", bold=False, color=SLATE, size=9, fill=MIST)
    cell.paragraphs[0].runs[0].bold = True
    borders(cell)

scope2 = document.add_table(rows=1, cols=2)
scope2.alignment = WD_TABLE_ALIGNMENT.CENTER
for cell, content in zip(scope2.rows[0].cells, [
    "INSIGHT & REPORTING\n\nDashboards and KPIs\nStandard and configurable reports\nSearch, filters, and exports\nNotification templates",
    "ENABLEMENT\n\nConfiguration and migration support\nTesting and UAT assistance\nTraining and user guides\nDeployment and handover",
]):
    set_cell(cell, content, color=SLATE, size=9, fill=WHITE)
    cell.paragraphs[0].runs[0].bold = True
    borders(cell)

new_content_page(document)
heading(document, "03", "Commercial framework")
text(document, "The following work-package ranges reconcile to the total indicative implementation budget. Amounts are in INR and exclude applicable taxes, hosting, software licences, and third-party subscriptions unless included in the final statement of work.")

budget = document.add_table(rows=1, cols=4)
budget.alignment = WD_TABLE_ALIGNMENT.CENTER
budget.autofit = False
widths = [0.48, 3.5, 1.12, 1.12]
for cell, width, value in zip(budget.rows[0].cells, widths, ["#", "WORK PACKAGE", "LOW", "HIGH"]):
    cell.width = Inches(width)
    set_cell(cell, value, bold=True, color=WHITE, size=8.5, fill=INK,
             align=WD_ALIGN_PARAGRAPH.CENTER if value != "WORK PACKAGE" else WD_ALIGN_PARAGRAPH.LEFT)

packages = [
    ("01", "Discovery, requirements & delivery planning", "₹1.50 L", "₹1.75 L"),
    ("02", "Architecture, UX & technical foundation", "₹2.25 L", "₹2.50 L"),
    ("03", "Core LIMS workflows & application build", "₹7.25 L", "₹8.00 L"),
    ("04", "Compliance controls, dashboards & reporting", "₹3.00 L", "₹3.50 L"),
    ("05", "Integration, migration & environment setup", "₹3.25 L", "₹3.50 L"),
    ("06", "QA, UAT, deployment, training & handover", "₹3.75 L", "₹4.75 L"),
]
for index, values in enumerate(packages):
    row = budget.add_row()
    for cell, width, value in zip(row.cells, widths, values):
        cell.width = Inches(width)
        set_cell(cell, value, color=INK if index % 2 == 0 else SLATE, size=8.6,
                 fill=MIST if index % 2 == 0 else WHITE,
                 align=WD_ALIGN_PARAGRAPH.CENTER if cell is not row.cells[1] else WD_ALIGN_PARAGRAPH.LEFT)
        borders(cell)

row = budget.add_row()
for cell, width in zip(row.cells, widths):
    cell.width = Inches(width)
set_cell(row.cells[0], "", fill=BLUE)
set_cell(row.cells[1], "TOTAL INDICATIVE BUDGET", bold=True, color=WHITE, size=9, fill=BLUE)
set_cell(row.cells[2], "₹21.00 L", bold=True, color=WHITE, size=9, fill=BLUE, align=WD_ALIGN_PARAGRAPH.CENTER)
set_cell(row.cells[3], "₹24.00 L", bold=True, color=WHITE, size=9, fill=BLUE, align=WD_ALIGN_PARAGRAPH.CENTER)

text(document, "Proposed payment milestones", size=11, color=INK, bold=True, before=12, after=4)
milestones = document.add_table(rows=1, cols=5)
for cell, content in zip(milestones.rows[0].cells, [
    "20%\nKick-off", "20%\nDesign sign-off", "30%\nCore build", "20%\nUAT readiness", "10%\nHandover"
]):
    set_cell(cell, content, bold=True, color=INK, size=8.2, fill=PALE, align=WD_ALIGN_PARAGRAPH.CENTER)
    borders(cell, CYAN, 5)

heading(document, "04", "Delivery roadmap")
roadmap = document.add_table(rows=1, cols=3)
roadmap.alignment = WD_TABLE_ALIGNMENT.CENTER
for cell, value in zip(roadmap.rows[0].cells, ["PHASE", "FOCUS", "DURATION"]):
    set_cell(cell, value, bold=True, color=WHITE, size=8.5, fill=INK)
for phase in [
    ("1  DISCOVER", "Workflows, roles, data, integrations, acceptance criteria", "2–3 weeks"),
    ("2  DESIGN", "Architecture, UX, security model, backlog, delivery plan", "2–3 weeks"),
    ("3  BUILD", "Configuration, development, integration, demonstrations", "10–14 weeks"),
    ("4  ASSURE", "System testing, UAT support, fixes, readiness review", "3–4 weeks"),
    ("5  LAUNCH", "Production deployment, training, documentation, handover", "1–2 weeks"),
]:
    row = roadmap.add_row()
    for cell, value in zip(row.cells, phase):
        set_cell(cell, value, color=SLATE, size=8.5)
        borders(cell)

new_content_page(document)
heading(document, "05", "Assumptions & boundaries")
for item in [
    "This document is a budgetary estimate and is not a final fixed-price statement of work.",
    "Final scope, milestones, acceptance criteria, effort, and commercials will be confirmed after discovery.",
    "TÜV Rheinland will provide timely stakeholder access, current process documents, sample data, and integration information.",
    "Source data is assumed to be structured and reasonably clean; extensive cleansing, digitisation, or reconstruction will be estimated separately.",
    "Cloud/hosting charges, software licences, devices, SMS or email charges, security certifications, travel, and third-party fees are excluded unless expressly stated.",
    "Material changes to integrations, user groups, sites, workflows, volumes, or regulatory needs will follow mutually agreed change control.",
    "The indicative timeline depends on timely reviews, approvals, environment access, and resolution of client-side dependencies.",
]:
    bullet(document, item)

heading(document, "06", "Next steps")
steps = document.add_table(rows=4, cols=2)
steps.alignment = WD_TABLE_ALIGNMENT.LEFT
steps.autofit = False
steps.columns[0].width = Inches(0.5)
steps.columns[1].width = Inches(6.2)
for row, (number, value) in zip(steps.rows, [
    ("01", "Confirm the business and technical stakeholder group."),
    ("02", "Conduct requirements and workflow validation workshops."),
    ("03", "Agree the release scope, integrations, environments, and acceptance model."),
    ("04", "Issue the detailed statement of work and fixed commercial proposal."),
]):
    row.cells[0].width = Inches(0.5)
    row.cells[1].width = Inches(6.2)
    row.height = Inches(0.34)
    row.height_rule = WD_ROW_HEIGHT_RULE.AT_LEAST
    set_cell(row.cells[0], number, bold=True, color=BLUE, size=8,
             fill=PALE, align=WD_ALIGN_PARAGRAPH.CENTER)
    set_cell(row.cells[1], value, color=INK, size=8.8, fill=WHITE)
    margins(row.cells[0], top=55, start=55, bottom=55, end=55)
    margins(row.cells[1], top=55, start=110, bottom=55, end=90)
    borders(row.cells[0], LINE, 3)
    borders(row.cells[1], LINE, 3)

text(document, "Alansa Technologies appreciates the opportunity to submit this proposal to TÜV Rheinland India. We look forward to validating the requirements and shaping a controlled, scalable LIMS implementation that delivers measurable operational value.", size=10, color=INK, before=14, after=10)

sign = document.add_table(rows=2, cols=2)
sign.alignment = WD_TABLE_ALIGNMENT.CENTER
for cell, value in zip(sign.rows[0].cells, ["FOR ALANSA TECHNOLOGIES", "FOR TÜV RHEINLAND INDIA"]):
    set_cell(cell, value, bold=True, color=WHITE, size=8.5, fill=INK)
for cell, value in zip(sign.rows[1].cells, [
    "Authorized signatory\n\nName: ____________________\nDate:  ____________________",
    "Acknowledged by\n\nName: ____________________\nDate:  ____________________",
]):
    set_cell(cell, value, color=SLATE, size=8.5)
    borders(cell)

for paragraph in document.paragraphs:
    paragraph.paragraph_format.widow_control = True

document.core_properties.title = "Alansa Technologies – LIMS Budgetary Technical and Commercial Proposal"
document.core_properties.subject = "LIMS implementation proposal for TÜV Rheinland India"
document.core_properties.author = "Alansa Technologies"
document.core_properties.keywords = "LIMS, TÜV Rheinland, Alansa Technologies, commercial proposal"
document.save(OUTPUT)
print(OUTPUT)
