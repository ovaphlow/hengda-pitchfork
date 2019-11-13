package hengda.pitchfork

import com.google.gson.Gson
import io.grpc.stub.StreamObserver
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class TrainServiceImpl: TrainGrpc.TrainImplBase() {
    private val logger: Logger = LoggerFactory.getLogger(TrainServiceImpl::class.java);

    override fun list(req: TrainRequest, responseObserver: StreamObserver<TrainReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                select
                    *,
                    (select v from public.common_data as cd where cd.id = t.master_id) as model
                from
                    public.train as t
                order by id desc limit 200
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getList(rs))
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        }

        val reply = TrainReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun save(req: TrainRequest, responseObserver: StreamObserver<TrainReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                insert into
                    public.train (master_id, name, remark)
                    values (?, ?, ?)
                returning id
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            val id = body.get("master_id").toString().toDouble().toInt()
            ps.setInt(1, id)
            ps.setString(2, body.get("name").toString())
            ps.setString(3, body.get("remark").toString())
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getMap(rs))
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        }

        val reply = TrainReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun get(req: TrainRequest, responseObserver: StreamObserver<TrainReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                select * from public.train where id = ? limit 1
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            val id = body.get("id").toString().toDouble().toInt()
            ps.setInt(1, id)
            val rs = ps.executeQuery()
            resp.put("content", DBUtil.getMap(rs))
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        }

        val reply = TrainReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun update(req: TrainRequest, responseObserver: StreamObserver<TrainReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                update
                    public.train
                set
                    master_id = ?,
                    name = ?,
                    remark = ?
                where
                    id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body.get("master_id").toString().toDouble().toInt())
            ps.setString(2, body.get("name").toString())
            ps.setString(3, body.get("remark").toString())
            ps.setInt(4, body.get("id").toString().toDouble().toInt())
            ps.execute()
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        }

        val reply = TrainReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }

    override fun remove(req: TrainRequest, responseObserver: StreamObserver<TrainReply>) {
        val gson = Gson()
        val resp: MutableMap<String, Any> = mutableMapOf("message" to "", "content" to "")

        try {
            val conn = DBUtil.getConn()
            val sql: String = """
                delete from public.train where id = ?
            """.trimIndent()
            val ps = conn.prepareStatement(sql)
            val body = gson.fromJson(req.data.toString(), Map::class.java);
            ps.setInt(1, body.get("id").toString().toDouble().toInt())
            ps.execute()
            conn.close()
        } catch (e: Exception) {
            e.printStackTrace()
            resp.put("message", "gRPC服务器错误")
        }

        val reply = TrainReply.newBuilder().setData(gson.toJson(resp)).build()
        responseObserver.onNext(reply)
        responseObserver.onCompleted()
    }
}