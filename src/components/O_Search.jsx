import React, { useEffect, useState, useRef } from 'react'
import { getPostTeasers } from '../scripts/api/search-data.js'
import A_Button from './UI/A_Button.jsx'

export default function O_Search() {
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const searchRef = useRef(null)

  // Загрузка данных
  useEffect(() => {
    getPostTeasers().then((data) => {
      setAllPosts(data)
      const shuffled = [...data].sort(() => 0.5 - Math.random())
      setFiltered(shuffled.slice(0, 10))
    })
  }, [])

  // Фильтрация
  useEffect(() => {
    if (query.length >= 3) {
      const q = query.toLowerCase()
      const matched = allPosts.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.type?.toLowerCase().includes(q)
      )
      setFiltered(matched)
    } else {
      const shuffled = [...allPosts].sort(() => 0.5 - Math.random())
      setFiltered(shuffled.slice(0, 10))
    }
  }, [query, allPosts])

  // Клик вне — закрыть
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Обнаружение мобилки
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 830
      setIsMobile(isNowMobile)
      setHasMounted(true)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={searchRef} className={`O_Search ${isFocused ? 'Is-Active' : ''}`}>
      <div className="O_SearchField" onClick={() => setIsFocused(true)}>
        {(isFocused || isMobile) && (
          <input
            type="text"
            placeholder="Проект, название, теги, автор..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={isFocused}
          />
        )}
        <A_Button variant="icon" iconType="search" />
      </div>

      {hasMounted && isFocused && (
        <div className="W_SearchDropdown">
          <p className="A_SearchMessage">
            {query.length >= 3
              ? filtered.length > 0
                ? 'Мы нашли…'
                : 'Мы ничего не нашли…'
              : 'Ищешь что-нибудь?'}
          </p>

          <div className="C_SearchResults">
            {filtered.map((item, i) => (
              <React.Fragment key={i}>
                <a
                  className="W_SearchItem"
                  onClick={() => item.url && (window.location.href = item.url)}
                >
                  <div className="M_SearchItem">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="A_SearchImg"
                    />
                    <div className="M_SearchInfo">
                      <span className="A_SearchType">{item.type}</span>
                      <p className="A_SearchTitle">{item.title}</p>
                    </div>
                  </div>

                  <A_Button
                    variant="icon+text"
                    link
                    iconType="arrow"
                    label="Смотреть"
                  />
                </a>
                {i < filtered.length - 1 && <div className="A_SearchDivider" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
