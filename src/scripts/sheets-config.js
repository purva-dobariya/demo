// One place to find every Google Sheet ID this site fetches content from at
// runtime. Not a secret — the ID is already visible in any page's Network
// tab — this exists purely so nobody has to go hunting through a page's
// inline <script> to find or change which sheet feeds it.
//
// Add an entry here whenever a new page/section starts fetching a sheet
// (e.g. homepage content), then read it as window.ONDCSheets.<key> instead
// of hardcoding the ID again.
window.ONDCSheets = {
  rfp: '1zDd4ET0kJhzb6lHUJ66fppIb4U6tbwS_goKskDNXY6Y', // pages/rfp.html — the RFP/RFQ ledger
};
