"use client"

import styles from './page.module.css'
import React, {useState} from "react";
import {Theme} from '@carbon/react'
import {NSClient, SeekResponse} from "@/app/nsclient";
import { Header } from "carbon-components-react";
import { ColorRing } from "react-loader-spinner";

import { Table, Accordion } from 'react-bootstrap';
import { FaLightbulb } from "react-icons/fa"
import { IconContext } from "react-icons"

export default function Home() {
  const [inputText, setInputText] = useState<string>('')
  const [result, setResult] = useState<SeekResponse|null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onChangeSearchText = (e: {target: HTMLInputElement, type: string}): void => setInputText(e.target.value);

  console.log(`NEXT_PUBLIC_NS_APIKEY: ${process.env.NEXT_PUBLIC_NS_APIKEY}`)
  console.log(`NEXT_PUBLIC_NS_INSTANCE_ID: ${process.env.NEXT_PUBLIC_NS_INSTANCE_ID}`)
  // @ts-ignore
  const nsClient = new NSClient(process.env.NEXT_PUBLIC_NS_APIKEY, process.env.NEXT_PUBLIC_NS_INSTANCE_ID);

  const sendRequest = async () => {
    setLoading(true)
    const response = await nsClient.seek({
      question: inputText,
      context: {},
      user_session: {
        metadata: {
          user_id: 'test_user_id',
        },
        system: {
          session_id: 'test_session_id'
        },
      },
      options: {
        language: "ja",
        includeSourceResults: 'true',
      }
    })

    setResult(response)
    setLoading(false)

    console.log(response)
  }

  return (
    <Theme theme={'g10'} className={styles.theme}>
      <ColorRing
          visible={loading}
          width={'25%'}
          height={'25%'}
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          wrapperStyle={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
      />
      <Header aria-label="NeuralseekDemo" className={styles.header}>
        <a href="#">NeuralSeek Demo</a>
      </Header>
      <div className={styles.main}>
        <div className={styles.searchContent}>
          <input type={'text'} onChange={onChangeSearchText} placeholder={'検索したい語句を入力してください'} className={styles.searchInputText}/>
          <button onClick={sendRequest} className={styles.searchButton}>検索</button>
        </div>
        {
          result === null ? <></> : (
            <div className={styles.resultContent}>
              <div className={styles.answer}>
                <IconContext.Provider value={{ color: '#a3a3a3'}}>
                  <FaLightbulb />
                </IconContext.Provider>
                {result.answer}
              </div>
              <Table striped={true} bordered={true} responsive={true} className={styles.answerTable}>
                <tbody>
                  <tr>
                    <td>見つかったDocument</td>
                    <td>{result.totalCount} 件</td>
                  </tr>
                  <tr>
                    <td>解答自信度</td>
                    <td>{result.score} %</td>
                  </tr>
                  <tr>
                    <td>セマンティックマッチ度</td>
                    <td>{result.semanticScore}</td>
                  </tr>
                  <tr>
                    <td>ドキュメントベースに対する自信度</td>
                    <td>{result.KBscore}</td>
                  </tr>
                  <tr>
                    <td>ドキュメントからの引用率</td>
                    <td>{result.kbCoverage}</td>
                  </tr>
                  <tr>
                    <td>ドキュメントからのレスポンスタイム</td>
                    <td>{result.kbTime}</td>
                  </tr>
                  <tr>
                    <td>トータルレスポンスタイム</td>
                    <td>{result.time}</td>
                  </tr>
                  {
                    result.passages ? result.passages.map((p, i) => {
                      return (
                        <tr key={i}>
                          <td colSpan={2}>
                            <Accordion>
                              <Accordion.Item eventKey={i.toString()}>
                                <Accordion.Header>
                                  <span className={styles.passageAccordionHeaderDocument}> {p.document} </span>
                                  <span className={styles.passageAccordionHeaderScore}> {p.score} </span>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className={styles.passageAccordionBody} dangerouslySetInnerHTML={{__html: p.passage}}></div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </td>
                        </tr>
                      )
                    }) : <></>
                  }
                </tbody>
              </Table>
            </div>
          )
        }
      </div>
    </Theme>
  )
}
