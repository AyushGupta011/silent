'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SmoothScroll from '../../components/SmoothScroll'
import CustomCursor from '../../components/CustomCursor'

const categories = ['All', 'Behind the scenes', 'Creative direction', 'Tech', 'Press']



export default function JournalClient({ cmsPosts = [] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)

  // Map CMS posts to match the UI data structure
  const allArticles = cmsPosts.map(post => ({
    id: post.id,
    title: post.title,
    category: post.category || 'Updates',
    date: post.publishedAt ? new Date(post.publishedAt).getFullYear().toString() : new Date().getFullYear().toString(),
    readTime: '3 min', // placeholder
    author: 'Silent House',
    excerpt: post.excerpt || '',
    image: post.image || 'https://www.datocms-assets.com/170269/1766441914-taylor_swift_the_eras_tour_silent-house.jpg?auto=format&fit=crop&w=1600',
    featured: post.featured || false,
    content: post.excerpt || 'Full content parsing to be implemented...', // simplify rich text for now
  }))

  const filteredArticles =
    activeCategory === 'All'
      ? allArticles
      : allArticles.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase())

  const featured = allArticles.find((a) => a.featured)

  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />

      <main className="min-h-screen bg-white text-zinc-950 pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
        {/* Intro */}
        <div className="max-w-7xl mx-auto mb-10 sm:mb-16 pb-8 border-b border-zinc-200">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            Journal / Archive
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[450] tracking-[-0.03em] leading-tight text-zinc-950">
            Stories, case studies & dispatches from live production.
          </h1>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar border-t border-zinc-100 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm sm:text-base font-[450] pb-0.5 whitespace-nowrap bg-gradient-to-r from-black to-black bg-no-repeat bg-left-bottom transition-[background-size] duration-300 ease-out ${
                  activeCategory === cat
                    ? 'text-zinc-950 bg-[length:100%_1px]'
                    : 'text-zinc-500 bg-[length:0%_1px] hover:text-zinc-950 hover:bg-[length:100%_1px]'
                }`}
                data-cursor="hover"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Featured Story */}
        {activeCategory === 'All' && featured && (
          <div className="max-w-7xl mx-auto mb-16">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 rounded-xs p-6 sm:p-10 border border-zinc-200 cursor-pointer group"
              onClick={() => setSelectedArticle(featured)}
              data-cursor="read"
            >
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden rounded-xs bg-zinc-900">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="uppercase">{featured.category}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-[450] tracking-tight leading-snug text-zinc-950 inline-block">
                  <span className="bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px] pb-0.5">
                    {featured.title}
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-950">
                    <span>Read Story</span>
                    <span>↳</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="space-y-3 cursor-pointer group"
              onClick={() => setSelectedArticle(article)}
              data-cursor="read"
            >
              <div className="aspect-[16/10] rounded-xs overflow-hidden bg-zinc-900">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
                <span className="uppercase">{article.category}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-[450] text-zinc-950 leading-snug inline-block">
                <span className="bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px] pb-0.5">
                  {article.title}
                </span>
              </h3>

              <p className="text-sm text-zinc-600 font-normal leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>

        {/* Interactive Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white text-zinc-950 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xs p-6 sm:p-10 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-black transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="uppercase">{selectedArticle.category}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime} read</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-[450] tracking-tight leading-tight text-zinc-950">
                    {selectedArticle.title}
                  </h2>

                  <div className="aspect-[16/9] w-full rounded-xs overflow-hidden bg-zinc-900">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-4">
                    <p className="font-medium text-zinc-950">{selectedArticle.excerpt}</p>
                    {selectedArticle.content.split('\n\n').map((para, i) => {
                      if (para.trim().startsWith('###')) {
                        return (
                          <h4 key={i} className="text-lg font-semibold text-zinc-950 pt-2">
                            {para.replace('###', '').trim()}
                          </h4>
                        )
                      }
                      return <p key={i}>{para.trim()}</p>
                    })}
                  </div>

                  <div className="pt-6 border-t border-zinc-200 flex justify-between items-center text-xs font-mono text-zinc-400">
                    <span>SILENT HOUSE JOURNAL</span>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="px-4 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-zinc-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </SmoothScroll>
  )
}
