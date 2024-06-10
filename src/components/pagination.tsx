import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from './ui/button'

export type PaginationProps = {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const [t] = useTranslation('translations', { keyPrefix: 'pagination' })

  const pages = Math.ceil(totalCount / perPage) || 1

  const hasNextPage = pageIndex === 0
  const hasPreviousPage = pages <= pageIndex + 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {t('totalLabel', { totalCount })}
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          {t('pageLabel', { page: pageIndex + 1, totalPages: pages })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            className="h-8 w-8 p-0"
            variant="outline"
            disabled={hasNextPage}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">{t('buttons.first')}</span>
          </Button>

          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            className="h-8 w-8 p-0"
            variant="outline"
            disabled={hasNextPage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">{t('buttons.previous')}</span>
          </Button>

          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            className="h-8 w-8 p-0"
            variant="outline"
            disabled={hasPreviousPage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">{t('buttons.next')}</span>
          </Button>

          <Button
            onClick={() => onPageChange(pages - 1)}
            className="h-8 w-8 p-0"
            variant="outline"
            disabled={hasPreviousPage}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">{t('buttons.last')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
