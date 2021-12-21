<?php

namespace tests;

use Helmich\MongoMock\MockCollection;
use MongoDB\Collection;
use PHPUnit\Framework\TestCase;

class mongoTest extends TestCase
{
    /** @var Collection */
    public $col;

    public function testInsertOneData()
    {
        $this->col = new MockCollection();

        $result = $this->col->insertOne(['nom' => 'Saint-Sébastien']);

        $find = $this->col->findOne(['_id' => $result->getInsertedId()]);

        self::assertThat($find, self::logicalNot(self::isNull()));
        self::assertThat($find['nom'], self::equalTo('Saint-Sébastien'));
    }

    public function testUpdateOneData()
    {
        $this->col = new MockCollection();

        $this->col->insertMany([
            ['nom' => 'Saint-Sébastien'],
            ['nom' => 'Saint-Léon']
        ]);

        $this->col->updateOne(['nom' => 'Saint-Léon'], ['$set' => ['nom' => 'Place des voges']]);

        self::assertThat($this->col->count(['nom' => 'Place des voges']), self::equalTo(1));
        self::assertThat($this->col->count(['nom' => 'Saint-Léon']), self::equalTo(0));
        self::assertThat($this->col->count(['nom' => 'Saint-Sébastien']), self::equalTo(1));
    }

    public function testDeleteOneData()
    {
        $this->col = new MockCollection();

        $this->col->insertMany([
                ['nom' => 'Saint-Sébastien'],
                ['nom' => 'Saint-Léon']
        ]);

        $this->col->deleteOne(['nom' => 'Saint-Sébastien']);

        self::assertThat($this->col->count(['nom' => 'Saint-Sébastien']), self::equalTo(0));
    }

}