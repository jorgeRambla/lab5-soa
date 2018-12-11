package soa.web;

import java.util.HashMap;
import java.util.Map;

import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class SearchController {

  private final ProducerTemplate producerTemplate;

  @Autowired
  public SearchController(ProducerTemplate producerTemplate) {
    this.producerTemplate = producerTemplate;
  }

  @RequestMapping("/")
  public String index() {
    return "index";
  }


  @RequestMapping(value = "/search")
  @ResponseBody
  public Object search(@RequestParam("q") String q, 
                      @RequestParam(value = "count", required = false, defaultValue = "10") int count,
                      @RequestParam(value = "lang", required = false, defaultValue = "es") String lang ) {
    //return producerTemplate.requestBodyAndHeader("direct:search", "", "CamelTwitterKeywords", q);
    Map<String, Object> headers = new HashMap<String, Object>();
    headers.put("CamelTwitterKeywords", q);
    headers.put("CamelTwitterCount", count);
    if(lang.length() == 2) { //If not language selected, search all languages
      headers.put("CamelTwitterSearchLanguage", lang);
    }
    return producerTemplate.requestBodyAndHeaders("direct:search", "", headers);
  }
}