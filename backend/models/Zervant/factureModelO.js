const mongoose =require ('mongoose')

const factureModel = mongoose.Schema(
  {
    clientf: {
     type : String ,
    },
    product: {
      type : String ,
     },
    num: {
      type: String,
      //required: true,
    },
    cond: {
      type: String,
      //required: true,
    },
    echa: {
      type: String,
    // echa: true,
    },
    enga: {
      type: String,
      //required: true,
    },
    service: {
      type: String,
      //required: true,
    },
    ref: {
        type: String,
        //required: true,
      },
      ordre: {
        type: String,
        //required: true,
      },
      communication : {
        type: String,
        //required: true,
      },
      qte: {
        type: String,
        //required: true,
      },
      unite : {
        type: String,
        //required: true,
      },
      prix : {
        type: String,
        //required: true,
      },
      tva : {
        type: String,
        //required: true,
      },
      montant : {
        type: String,
        //required: true,
      },
      title : {
        type: String,
        //required: true,
      },
      champText: {
        type: String,
        //required: true,
      },
      message: {
        type: String,
        //required: true,
      },
      note: {
        type: String,
        //required: true,
      },
      date1: {
        type: String,
        //required: true,
      },
      date2: {
        type: String,
        //required: true,
      },
  },
  {
    timestamps: true,
  }
)

//module.exports = mongoose.model('Clientf', clientfSchema)
const Facture = mongoose.model("Facture", factureModel);

module.exports = Facture;

