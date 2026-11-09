from pathlib import Path
import re

from docx import Document
from docx.shared import Inches, RGBColor


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'docs' / 'Crossmotiv_LIMS_Budgetary_Commercial_Proposal_TUV_Rheinland.docx'
OUTPUT = ROOT / 'docs' / 'Amiro_LIMS_Budgetary_Commercial_Proposal_TUV_Rheinland_Submission_Final.docx'
LOGO = ROOT / 'docs' / 'amiro-logo-proposal.png'


def replace_text(text):
    replacements = {
        'Cross motive': 'Amiro Tech Solutions',
        'Crossmotiv': 'Amiro Tech Solutions',
        'CrossMotive': 'Amiro Tech Solutions',
        'CROSSMOTIVE': 'Amiro Tech Solutions',
        'Cross motive': 'Amiro Tech Solutions',
        '[Company Logo]': '',
        '₹19,00,000 – ₹25,00,000': '₹17,00,000 – ₹22,00,000',
        '₹19,00,000 – ₹25,00,000 + Applicable Taxes': '₹17,00,000 – ₹22,00,000 + Applicable Taxes',
        '₹19.00–25.00 Lakhs': '₹17.00–22.00 Lakhs',
        '₹19.00–25.00 Lakhs + Applicable Taxes': '₹17.00–22.00 Lakhs + Applicable Taxes',
        '15 days from the date of submission': '30 days from the date of submission',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


def replace_in_paragraph(paragraph):
    # Replace within runs so the source document's formatting remains intact.
    full_text = replace_text(paragraph.text)
    if full_text != paragraph.text and len(paragraph.runs) > 1:
        paragraph.runs[0].text = full_text
        for run in paragraph.runs[1:]:
            run.text = ''
        return
    for run in paragraph.runs:
        updated = replace_text(run.text)
        if updated != run.text:
            run.text = updated


def apply_amiro_palette(document):
    color_map = {
        '17365D': '202A36',
        '2F75B5': 'F4B400',
        'EAF2F8': 'FFF5D6',
    }
    paragraphs = list(document.paragraphs)
    for table in document.tables:
        paragraphs.extend(paragraph for row in table.rows for cell in row.cells for paragraph in cell.paragraphs)
    for paragraph in paragraphs:
        for run in paragraph.runs:
            if run.font.color and run.font.color.rgb:
                current = str(run.font.color.rgb)
                if current in color_map:
                    run.font.color.rgb = RGBColor.from_string(color_map[current])
    for table in document.tables:
        for row in table.rows:
            for cell in row.cells:
                for shading in cell._tc.xpath('.//w:shd'):
                    fill = shading.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}fill')
                    if fill in color_map:
                        shading.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}fill', color_map[fill])


document = Document(SOURCE)

for paragraph in document.paragraphs:
    replace_in_paragraph(paragraph)

for table in document.tables:
    for row in table.rows:
        for cell in row.cells:
            for paragraph in cell.paragraphs:
                replace_in_paragraph(paragraph)

for section in document.sections:
    for part in (section.header, section.footer):
        for text_node in part._element.xpath('.//w:t'):
            text = text_node.text or ''
            if part is section.header and text.strip() == 'E':
                text_node.text = ''
                continue
            text = replace_text(text)
            if re.search(r'cross\s*motiv', text, re.IGNORECASE):
                text = re.sub(r'cross\s*motiv\w*', 'Amiro Tech Solutions', text, flags=re.IGNORECASE)
            text_node.text = text

apply_amiro_palette(document)

# Keep the original commercial table structure while making its indicative line items
# reconcile to the requested overall range.
commercial_rows = [
    '₹0.50–0.75 Lakhs',
    '₹1.50–2.00 Lakhs',
    '₹3.00–3.50 Lakhs',
    '₹3.50–4.00 Lakhs',
    '₹2.50–3.00 Lakhs',
    '₹1.25–1.50 Lakhs',
    '₹1.50–2.00 Lakhs',
    '₹1.75–2.25 Lakhs',
    '₹1.25–1.50 Lakhs',
    '₹0.50–1.00 Lakhs',
]
if len(document.tables) > 5:
    commercial_table = document.tables[5]
    for row, amount in zip(commercial_table.rows[1:], commercial_rows):
        amount_paragraph = row.cells[1].paragraphs[0]
        if amount_paragraph.runs:
            amount_paragraph.runs[0].text = amount
            for run in amount_paragraph.runs[1:]:
                run.text = ''
        else:
            amount_paragraph.add_run(amount)

# The original proposal had no usable logo image. Add Amiro's mark to the existing
# header area without changing the document's body layout or table styling.
header = document.sections[0].header
logo_paragraph = header.paragraphs[0]
logo_paragraph.alignment = 0
logo_paragraph.add_run().add_picture(str(LOGO), width=Inches(1.8))

document.core_properties.title = 'Amiro Tech Solutions - LIMS Budgetary Technical and Commercial Proposal'
document.core_properties.author = 'Amiro Tech Solutions'
document.core_properties.subject = 'LIMS proposal submitted to TÜV Rheinland India'
document.save(OUTPUT)
print(OUTPUT)