/**
 * Tarka Institute — from the founding documents (Drive: tarka_institute_founding_documents)
 * and the 2026–27 soft-launch plan in the Tarka Growth Strategy.
 * Chair-holders, the fiscal sponsor and lecture dates are not yet confirmed.
 */
export const institute = {
  name: "Tarka Institute",
  dek: "A centre for contemplative scholarship and public inquiry.",
  status: "An independent non-profit, US 501(c)(3) application in preparation. Founded in partnership with Embodied Philosophy, which produces its events under contract and holds no ownership stake or vote.",

  launch: {
    eyebrow: "Inaugural lecture series",
    when: "January–May 2027",
    title: "Five free public lectures from the first Tarka Chair",
    body: "One lecture a month, streamed live and kept in the open archive. The Chair gives the opening keynote at the Annual Congress on 10–11 April 2027, where the Institute and its first Fellow are formally announced.",
    chairHolder: "[Chair-holder to be announced]",
  },

  programs: [
    { name: "Scholarly Chairs", body: "Modelled on the Collège de France: chair-holders teach from their current research, not from settled positions. Each gives free monthly public lectures, one annual seminar and the Congress keynote.", href: undefined },
    { name: "Fellows", body: "One fellowship a year for each Chair, for a doctoral or early-career scholar-practitioner: a $5,000 stipend, seminar access and mentorship.", href: undefined },
    { name: "The Contemplative Consortium", body: "A network of universities, research centres, journals and lineage schools that convenes the Annual Congress of Scholar-Practitioners.", href: "/consortium" },
    { name: "The Āmnāya Alliance", body: "A network of Tantric lineage schools hosted by the Institute, with its own track at the Congress.", href: undefined },
    // TODO: add the Anusandhāna Program once it is described.
  ],

  chairs: [
    { name: "South Asian Philosophy and Contemplative Practice", sub: "Pramāṇa, Pratyabhijñā, and the Epistemology of Recognition" },
    { name: "Contemplative Ethics and Social Thought", sub: "Dharma, Responsibility, and the Scholar-Practitioner in Public Life" },
    { name: "Contemplative Aesthetics and the Theory of Rasa", sub: "Beauty, Embodied Knowledge, and the Epistemology of Aesthetic Experience" },
  ],

  governance: [
    "A Steering Council of seven: four scholar-practitioners nominated by Consortium members, one member from the Āmnāya Alliance, one independent member, and the Founding Director (ex officio, voting only to break ties).",
    "Chair nominations open each March; the Council votes in May. Appointing a Chair takes a two-thirds vote.",
    "An advisory board serves until the Council is seated in 2027–28.",
  ],

  timeline: [
    { year: "2026–27", title: "Founding year", body: "The first Chair and five free lectures; the online Congress; the first Fellow; an advisory board." },
    { year: "2027–28", title: "Second Chair", body: "501(c)(3) status; the Steering Council seated; the first in-person Congress, June 2028." },
    { year: "2028–29", title: "Three Chairs", body: "All three Chairs in place, with fellowships fully funded." },
  ],

  support: {
    title: "Support the Institute",
    body: "Named Chairs (“The [Name] Chair in Contemplative Aesthetics”), named Fellowships, and gifts toward free public lectures. Tax-deductible giving opens with our fiscal sponsor [to confirm] ahead of 501(c)(3) status.",
  },
};
