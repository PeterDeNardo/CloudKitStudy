//
//  ViewController.swift
//  Lina
//
//  Created by Peter De Nardo on 29/04/19.
//  Copyright © 2019 Peter De Nardo. All rights reserved.
//
//
/*
 
 POC conecção CloudKit com o App
 
 */

import UIKit
import CloudKit

class ViewController: UIViewController {
    
    // arrays de Users
    var users = [CKRecord]()
    
    // Acesso ao container que contem os BD
    let container = CKContainer.default()
    
    // variavel de acesso banco de dados privado
    let privateDB = CKContainer.default().privateCloudDatabase
    
    // variavel de acesso banco de dados publico
    let publicDB = CKContainer.default().publicCloudDatabase
    
    // variavel de acesso banco de dados compartilhado
    let sharedDB = CKContainer.default().sharedCloudDatabase

    override func viewDidLoad() {
        super.viewDidLoad()
       
        // Adiciona um valor novo no Banco de dados
        // Acassa um record do BD, (record é um conceito similar a uma tabela do SQL)
        let record = CKRecord(recordType: "Establishment")
        // Cra um novo valor localmente
        record.setValue("Gorila", forKey: "name")
        // Salva o valor no banco de dados público
        publicDB.save(record) { (record, error) in
            guard record != nil else {return}
        }
        
        // Printa todos os valores dentro de uma Record (Tabela)
        // Define um critério de pesquisa dentro do banco de dados
        let query = CKQuery(recordType: "Establishment", predicate: NSPredicate(value: true))
        // Busca dentro do banco de dados públicos o valor da Querry
        publicDB.perform(query, inZoneWith: nil) { (records, error) in
            guard let records = records else {return}
            // printa o nome do primeiro resultado
            print(records[0].value(forKey: "name"))
            self.users = records
            // printa todos os resultados da pesquisa
            print(self.users)
        }
        
        // Atualiza um valor do banco de dados
        // Utiliza a mesma query anterior para acessar a mesma tabela
        publicDB.perform(query, inZoneWith: nil) { (records, error) in
            guard let records = records else {return}
            
            // dentro dos resultados acessa um valor especifico ("adsad") e atualiza o seu valor
            for record in records {
                if (record["name"] == "adsad") {
                    record["name"] = "atualizado"
                    
                    // salva o banco de dados enviando o valor atualizado
                    self.publicDB.save(record, completionHandler: { (record, error) in
                        
                    })
                    
                }
            }
        }
        
        // Deleta um valor especifico dentro do banco de dados
        // Utiliza a mesma query anterior para acessar a mesma tabela
        publicDB.perform(query, inZoneWith: nil) { (records, error) in
            guard let records = records else {return}
            
            // filtra os resultados e deleta o valor desejado ("atualizado")
            for record in records {
                if (record["name"] == "atualizado") {
                    self.publicDB.delete(withRecordID: record.recordID, completionHandler: { (result, error) in
                        print(result, print)
                    })
                }
            }
        }
    }

    
    
}

