import Api from '/src/controllers/frontend';
import Helper from '/src/controllers/helper';

export default async function handler(req, res) {

    const tipos = [1, 2, 3];
    const data = new Date().toISOString();
    const api = new Api();
    let sitemap = "<?xml version='1.0' encoding='UTF-8'?>";
    sitemap += "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>";
    

    //home
    const url = "https://www.tabelafipe.blog.br/"
    sitemap += "<url>";
    sitemap += `<loc>${url}</loc>`;
    sitemap += `<lastmod>${ data }</lastmod>`;
    sitemap += "<changefreq>monthly</changefreq>";
    sitemap += "<priority>1.0</priority>";
    sitemap += "</url>";

    //carros
    sitemap += "<url>";
    sitemap += `<loc>${url + "carros"}</loc>`;
    sitemap += `<lastmod>${ data }</lastmod>`;
    sitemap += "<changefreq>monthly</changefreq>";
    sitemap += "<priority>0.8</priority>";
    sitemap += "</url>";

    //caminhões
    sitemap += "<url>";
    sitemap += `<loc>${url + "caminhoes"}</loc>`;
    sitemap += `<lastmod>${ data }</lastmod>`;
    sitemap += "<changefreq>monthly</changefreq>";
    sitemap += "<priority>0.8</priority>";
    sitemap += "</url>";

    //motos
    sitemap += "<url>";
    sitemap += `<loc>${url + "motos"}</loc>`;
    sitemap += `<lastmod>${ data }</lastmod>`;
    sitemap += "<changefreq>monthly</changefreq>";
    sitemap += "<priority>0.8</priority>";
    sitemap += "</url>";

    await Promise.all(
    tipos.map(async (e) =>{
        await api.getMarcas(api.mesReferencia.Codigo, e);
        const marcas = api.marcas;

        marcas.map(async (m) =>{
            console.log(m)
            sitemap += "<url>";
            sitemap += `<loc>${url + Helper.LabelTipoVeiculoURL(e) + "/" + Helper.NormalizeURL(m.Label)}</loc>`;
            sitemap += `<lastmod>${ data }</lastmod>`;
            sitemap += "<changefreq>monthly</changefreq>";
            sitemap += "<priority>0.8</priority>";
            sitemap += "</url>";
        });

    })
    )

    sitemap += "</urlset>";
    res.status(200).json(sitemap)
  }
  