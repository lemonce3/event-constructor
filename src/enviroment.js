let isECS = true;
try { new MouseEvent('click', {}); } catch (_) { isECS = false;}

module.exports = {
    isECS,
    isIE8: !document.createEvent && !isECS
};

